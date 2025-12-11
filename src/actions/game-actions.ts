"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

// 1. OYUN İÇİN KELİME ÇEKME (GRUP DESTEKLİ)
export async function getNounsForGame() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const activeGroupId = cookieStore.get("active_group_id")?.value;

  let query = supabase
    .from("vocabulary")
    .select("id, word, meaning_tr, article, example_sentence, group_id")
    .eq("type", "noun")
    .not("article", "is", null);

  // FİLTRELEME MANTIĞI:
  if (activeGroupId) {
    // A) Grup Modu: Sadece bu grubun kelimeleri
    query = query.eq("group_id", activeGroupId);
  } else {
    // B) Kişisel Mod: Sadece benim kelimelerim (group_id NULL)
    query = query.is("group_id", null);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Game data fetch error:", error);
    return [];
  }

  // Shuffle (Karıştır) ve ilk 20 tanesini al (Performans için)
  return data.sort(() => 0.5 - Math.random()).slice(0, 20);
}

// 2. FİİL ÇEKME (Verb Trainer İçin)
export async function getVerbsForGame() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const activeGroupId = cookieStore.get("active_group_id")?.value;

  let query = supabase
    .from("vocabulary")
    .select("*")
    .eq("type", "verb")
    .not("conjugation", "is", null);

  if (activeGroupId) {
    query = query.eq("group_id", activeGroupId);
  } else {
    query = query.is("group_id", null);
  }

  const { data, error } = await query;

  if (error || !data) return [];
  return data.sort(() => 0.5 - Math.random()).slice(0, 20);
}

// 3. FLASHCARDS ÇEKME
export async function getFlashcards() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const activeGroupId = cookieStore.get("active_group_id")?.value;

  let query = supabase.from("vocabulary").select("*");

  if (activeGroupId) {
    query = query.eq("group_id", activeGroupId);
  } else {
    query = query.is("group_id", null);
  }

  const { data, error } = await query;

  if (error || !data) return [];
  return data.sort(() => 0.5 - Math.random()).slice(0, 50);
}

// ==========================================
// 4. KRİTİK BÖLÜM: SKOR KAYDETME (GAMIFICATION)
// ==========================================

// Bir kelimeye cevap verdiğinde çağır
export async function registerWordPractice(
  vocabId: string,
  isCorrect: boolean,
) {
  const supabase = await createClient();

  // 1. Kelime İlerlemesini Kaydet (Doğru/Yanlış sayısı)
  // SQL'de yazdığımız 'record_word_practice' fonksiyonunu çağırıyoruz
  const { error } = await supabase.rpc("record_word_practice", {
    p_vocab_id: vocabId,
    p_is_correct: isCorrect,
  });

  if (error) console.error("Progress save error:", error);

  // 2. Eğer doğruysa XP ver (Doğru cevap = 10 XP)
  // Yanlışsa 0 XP (veya eksi puan istersen burayı değiştir)
  if (isCorrect) {
    await supabase.rpc("update_user_xp", {
      p_xp_amount: 10,
    });
  }
}

// Oyun bittiğinde ekstra Bonus XP vermek istersen
export async function finishGameBonus() {
  const supabase = await createClient();
  await supabase.rpc("update_user_xp", {
    p_xp_amount: 50, // Oyun bitirme bonusu
  });
}
