"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { TablesUpdate } from "@/types/database.types";

const formSchema = z.object({
  word: z.string().min(1, "Kelime girmelisin"),
  // Türkçe anlamı bile opsiyonel yapabilirsin, sonra doldurursun.
  meaning_tr: z.string().min(1, "Türkçe anlamını girmelisin"), 
  
  // Varsayılan olarak noun seçili gelir ama validation hatası vermez
  type: z.enum(["noun", "verb", "adjective", "phrase", "other"]).default("noun"),

  // ARTIK HİÇBİRİ ZORUNLU DEĞİL
  article: z.enum(["der", "die", "das"]).optional().nullable(),
  plural: z.string().optional().nullable(),
  example_sentence: z.string().optional().nullable(),
  
  // Verb çekimleri tamamen opsiyonel
  conjugation_ich: z.string().optional().nullable(),
  conjugation_du: z.string().optional().nullable(),
  conjugation_er_sie_es: z.string().optional().nullable(),
  conjugation_wir: z.string().optional().nullable(),
  conjugation_ihr: z.string().optional().nullable(),
  conjugation_sie_Sie: z.string().optional().nullable(),

  category: z.string().optional(),
});
// superRefine BLOKLARINI SİLDİK. Artık "Noun seçtin ama artikel girmedin" hatası yok.

export type FormState = {
  message: string;
  success: boolean | null;
  errors?: Record<string, string[]>;
};

export async function addWordAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const activeGroupId = cookieStore.get("active_group_id")?.value;

  const type = formData.get("type") || "noun"; // Seçilmediyse noun kabul et

  // Çekim verilerini topla ama boşlarsa null gönder
  const conjugationData = {
      ich: formData.get("conjugation_ich") || null,
      du: formData.get("conjugation_du") || null,
      er_sie_es: formData.get("conjugation_er_sie_es") || null,
      wir: formData.get("conjugation_wir") || null,
      ihr: formData.get("conjugation_ihr") || null,
      sie_Sie: formData.get("conjugation_sie_Sie") || null,
  };

  const rawData = {
    word: formData.get("word"),
    meaning_tr: formData.get("meaning_tr"),
    type,
    article: formData.get("article") || null, // Seçilmediyse null gider
    plural: formData.get("plural") || null,
    example_sentence: formData.get("example_sentence") || null,
    // Veritabanına boş obje değil, tamamen null veya dolu obje gönderelim
    conjugation: type === 'verb' ? conjugationData : null, 
    category: formData.get("category") || "general",
    group_id: activeGroupId || null,
  };

  const validatedFields = formSchema.safeParse(rawData);

  if (!validatedFields.success) {
    // Build errors object from issues array (modern Zod v4 approach)
    const errors: Record<string, string[]> = {};
    
    for (const issue of validatedFields.error.issues) {
      const path = issue.path.join('.');
      if (path) {
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issue.message);
      }
    }
    
    return {
      success: false,
      message: "Eksik bilgi var.",
      errors,
    };
  }

  const { error } = await supabase.from("vocabulary").insert([rawData] as any);

  if (error) {
    console.error("Supabase Error:", error);
    return { success: false, message: "Veritabanı hatası oluştu." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/vocabulary");

  return { success: true, message: "Kelime kaydedildi!" };
}


export async function updateWordAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await createClient();

  const id = formData.get("id") as string;

  // Not: Update sırasında group_id değiştirmiyoruz, kelime hangi alandaysa orada kalır.
  // Ancak eksik olan conjugation verilerini buraya eklemen iyi olur (isteğe bağlı).

  const rawData = {
    word: formData.get("word"),
    meaning_tr: formData.get("meaning_tr"),
    type: formData.get("type"),
    article: formData.get("article") || null,
    plural: formData.get("plural"),
    example_sentence: formData.get("example_sentence"),
  } as TablesUpdate<"vocabulary">;

  const { error } = await supabase
    .from("vocabulary")
    .update(rawData)
    .eq("id", id);

  if (error) {
    console.error("Update Error:", error);
    return { success: false, message: "Güncelleme hatası." };
  }

  revalidatePath("/vocabulary");
  revalidatePath("/dashboard");

  return { success: true, message: "Kelime güncellendi!" };
}

export async function deleteWord(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("vocabulary").delete().eq("id", id);

  if (error) {
    return { success: false, message: "Silinemedi" };
  }

  revalidatePath("/vocabulary");
  revalidatePath("/dashboard");
  return { success: true, message: "Silindi" };
}

export async function getDashboardStats() {
  const supabase = await createClient();

  const cookieStore = await cookies();
  const activeGroupId = cookieStore.get("active_group_id")?.value;

  const applyGroupFilter = (query: any) => {
    if (activeGroupId) {
      return query.eq("group_id", activeGroupId);
    } else {
      return query.is("group_id", null);
    }
  };

  // 1. Toplam Kelime Sayısı
  const totalQuery = supabase
    .from("vocabulary")
    .select("*", { count: "exact", head: true });
  const { count: totalCount } = await applyGroupFilter(totalQuery);

  // 2. İsimler (Nouns)
  const nounQuery = supabase
    .from("vocabulary")
    .select("*", { count: "exact", head: true })
    .eq("type", "noun");
  const { count: nounCount } = await applyGroupFilter(nounQuery);

  // 3. Fiiller (Verbs)
  const verbQuery = supabase
    .from("vocabulary")
    .select("*", { count: "exact", head: true })
    .eq("type", "verb");
  const { count: verbCount } = await applyGroupFilter(verbQuery);

  // 4. Son Eklenenler
  const recentQuery = supabase
    .from("vocabulary")
    .select("id, word, meaning_tr, type, article")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: recentWords } = await applyGroupFilter(recentQuery);

  return {
    totalCount: totalCount || 0,
    nounCount: nounCount || 0,
    verbCount: verbCount || 0,
    recentWords: recentWords || [],
  };
}
