"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInAnonymously() {
  const supabase = await createClient();

  // Önce mevcut session'ı kontrol et
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Session yoksa yeni anonim giriş yap
  if (!session) {
    const { error } = await supabase.auth.signInAnonymously();

    if (error) {
      console.error("Auth error:", error.message);
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function resetAllData() {
  const supabase = await createClient();

  // Kullanıcının tüm verilerini sil
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // Notları sil
    await supabase.from("notes").delete().eq("user_id", user.id);
    // Kelimeleri sil
    await supabase.from("vocabulary").delete().eq("user_id", user.id);
  }

  // Oturumu kapat
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
