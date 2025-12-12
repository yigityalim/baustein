"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInAnonymously(formData: FormData) {
  const supabase = await createClient();

  // Kullanıcının girdiği ismi al, girmezse "Misafir Öğrenci" yap
  const displayName = formData.get("username")?.toString() || "Misafir Öğrenci";

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // BURASI ÖNEMLİ: Meta data olarak ismi gönderiyoruz
    // SQL Trigger'ımız bu ismi alıp 'profiles' tablosuna yazacak!
    const { error } = await supabase.auth.signInAnonymously({
      options: {
        data: {
          full_name: displayName,
          avatar_url: `https://api.dicebear.com/7.x/notionists/svg?seed=${displayName}`, // Otomatik avatar
        },
      },
    });

    if (error) {
      console.error("Auth error:", error.message);
      return; // Hata varsa yönlendirme yapma
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function resetAllData() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // 1. Tabloları temizle (Sıra önemli olabilir foreign key yüzünden)
  // group_members ve profiles tabloları 'cascade' ise otomatik silinir ama manuel yapmak güvenlidir.
  await supabase.from('notes').delete().eq('user_id', user.id);
  await supabase.from('vocabulary').delete().eq('user_id', user.id);
  await supabase.from('word_progress').delete().eq('user_id', user.id);
  
  // Profil puanlarını sıfırla (Profili silmek yerine resetlemek daha güvenli olabilir)
  await supabase.from('profiles').update({ 
    xp: 0, 
    current_streak: 0, 
    last_study_date: null 
  }).eq('id', user.id);

  // 2. Çıkış yap ve yönlendir
  await supabase.auth.signOut();
  
  revalidatePath('/', 'layout');
  redirect('/login');
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
