"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { TablesUpdate } from "@/types/database.types";

const formSchema = z.object({
  word: z.string().min(1, "Kelime girmelisin"),
  meaning_tr: z.string().min(1, "Türkçe anlamını girmelisin"),
  type: z.enum(["noun", "verb", "adjective", "phrase", "other"]),
  article: z.enum(["der", "die", "das"]).nullable().optional(),
  plural: z.string().optional(),
  example_sentence: z.string().optional(),
  conjugation_ich: z.string().optional(),
  conjugation_du: z.string().optional(),
  conjugation_er_sie_es: z.string().optional(),
  conjugation_wir: z.string().optional(),
  conjugation_ihr: z.string().optional(),
  conjugation_sie_Sie: z.string().optional(),
  category: z.string().optional(),
});

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

  const type = formData.get("type");

  let conjugationData = null;
  if (type === "verb") {
    conjugationData = {
      ich: formData.get("conjugation_ich"),
      du: formData.get("conjugation_du"),
      er_sie_es: formData.get("conjugation_er_sie_es"),
      wir: formData.get("conjugation_wir"),
      ihr: formData.get("conjugation_ihr"),
      sie_Sie: formData.get("conjugation_sie_Sie"),
    };
  }

  const rawData = {
    word: formData.get("word"),
    meaning_tr: formData.get("meaning_tr"),
    type: type,
    article: formData.get("article") || null,
    plural: formData.get("plural"),
    example_sentence: formData.get("example_sentence"),
    category: formData.get("category"),
    conjugation: conjugationData,
  } as any;

  const validatedFields = formSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Lütfen alanları kontrol et.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.from("vocabulary").insert([rawData]);

  if (error) {
    console.error("Supabase Error:", error);
    return { success: false, message: "Veritabanı hatası oluştu." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/vocabulary");

  return { success: true, message: "Kelime başarıyla eklendi!" };
}

export async function updateWordAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await createClient();

  const id = formData.get("id") as string;

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

  const { count: totalCount } = await supabase
    .from("vocabulary")
    .select("*", { count: "exact", head: true });

  const { count: nounCount } = await supabase
    .from("vocabulary")
    .select("*", { count: "exact", head: true })
    .eq("type", "noun");

  const { count: verbCount } = await supabase
    .from("vocabulary")
    .select("*", { count: "exact", head: true })
    .eq("type", "verb");

  const { data: recentWords } = await supabase
    .from("vocabulary")
    .select("id, word, meaning_tr, type, article")
    .order("created_at", { ascending: false })
    .limit(5);

  return {
    totalCount: totalCount || 0,
    nounCount: nounCount || 0,
    verbCount: verbCount || 0,
    recentWords: recentWords || [],
  };
}
