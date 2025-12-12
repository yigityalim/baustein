"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

// Rastgele davet kodu üretici (Örn: ALM-4X92)
function generateJoinCode() {
  return "DE-" + Math.random().toString(36).substring(2, 6).toUpperCase();
}

const createGroupSchema = z.object({
  name: z.string().min(3, "Grup ismi en az 3 karakter olmalı"),
});

const joinGroupSchema = z.object({
  code: z.string().min(1, "Davet kodu boş olamaz"),
});

// 1. GRUP OLUŞTURMA
export async function createGroupAction(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) return { success: false, message: "Giriş yapmalısınız" };

  const name = formData.get("name") as string;
  const validation = createGroupSchema.safeParse({ name });

  if (!validation.success) {
    return { success: false, message: validation.error.issues[0].message };
  }

  // Grubu oluştur
  const joinCode = generateJoinCode();
  console.log("🎯 Grup oluşturuluyor:", { name, joinCode });

  const { data: group, error: groupError } = await supabase
    .from("study_groups")
    .insert([{ name, join_code: joinCode, created_by: user.id }])
    .select()
    .single();

  if (groupError || !group) {
    console.error("❌ Grup oluşturma hatası:", groupError);
    return { success: false, message: "Grup oluşturulamadı." };
  }

  console.log("✅ Grup oluşturuldu:", { groupId: group.id, joinCode });

  // Oluşturan kişiyi otomatik üye yap (Admin)
  const { error: memberError } = await supabase
    .from("group_members")
    .insert([{ group_id: group.id, user_id: user.id }]);

  if (memberError) {
    console.error("❌ Üyelik hatası:", memberError);
    return { success: false, message: "Üyelik kaydı başarısız." };
  }

  console.log("✅ Grup kuruldu ve üyelik eklendi:", { joinCode });

  revalidatePath("/groups");
  return { success: true, message: "Grup kuruldu!", code: joinCode };
}

// 2. KOD İLE GRUBA KATILMA
export async function joinGroupAction(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) return { success: false, message: "Giriş yapmalısınız" };

  const code = ((formData.get("code") as string) || "").trim().toUpperCase();

  if (!code) {
    return {
      success: false,
      message: "Davet kodu boş olamaz.",
      debug: { error: "Code is empty" },
    };
  }

  console.log("🔍 Grup aranıyor:", { code, userId: user.id });

  // Önce grubu bul
  const { data: group, error: findError } = await supabase
    .from("study_groups")
    .select("id")
    .eq("join_code", code)
    .maybeSingle();

  if (findError || !group) {
    console.error("❌ Grup bulunamadı:", {
      code,
      error: findError,
      message: findError?.message,
      details: findError?.details,
      hint: findError?.hint,
    });
    return {
      success: false,
      message: "Geçersiz davet kodu.",
      debug: {
        code,
        error: findError?.message,
        hint: findError?.hint,
      },
    };
  }

  console.log("✅ Grup bulundu:", { groupId: group.id, code });

  // Üye yap
  const { error: joinError } = await supabase
    .from("group_members")
    .insert([{ group_id: group.id, user_id: user.id }]);

  if (joinError) {
    console.error("❌ Gruba katılma hatası:", {
      groupId: group.id,
      userId: user.id,
      code: joinError.code,
      message: joinError.message,
      details: joinError.details,
      hint: joinError.hint,
    });
    // Unique constraint hatasıysa zaten üyedir
    if (joinError.code === "23505") {
      return { success: false, message: "Zaten bu gruptasın." };
    }
    return {
      success: false,
      message: "Katılma başarısız.",
      debug: {
        code: joinError.code,
        error: joinError.message,
        hint: joinError.hint,
      },
    };
  }

  console.log("✅ Gruba başarıyla katıldı:", {
    groupId: group.id,
    userId: user.id,
  });

  revalidatePath("/groups");
  return { success: true, message: "Gruba katıldın!" };
}

// 3. GRUPTAN AYRILMA
export async function leaveGroupAction(groupId: string) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) return;

  await supabase
    .from("group_members")
    .delete()
    .eq("group_id", groupId)
    .eq("user_id", user.id);

  revalidatePath("/groups");
}

// AKTİF GRUBU DEĞİŞTİR
export async function setActiveGroupAction(groupId: string | null) {
  const cookieStore = await cookies();

  if (groupId) {
    // Grubu seçti, 30 gün sakla
    cookieStore.set("active_group_id", groupId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  } else {
    // "Kişisel Alan" seçti, cookie'yi sil
    cookieStore.delete("active_group_id");
  }

  revalidatePath("/"); // Tüm uygulamayı yenile
}
