"use server";

import { createClient } from "@/lib/supabase/server";

export async function getNounsForGame() {
  const supabase = await createClient();

  // Sadece 'noun' olanları ve artikeli dolu olanları çek
  const { data, error } = await supabase
    .from("vocabulary")
    .select("id, word, meaning_tr, article, example_sentence")
    .eq("type", "noun")
    .not("article", "is", null)
    .limit(100); // Şimdilik son 100 kelime yeter

  if (error) {
    console.error("Game data fetch error:", error);
    return [];
  }

  // Fisher-Yates Shuffle (Diziyi karıştırır)
  const shuffled = data.sort(() => 0.5 - Math.random());

  return shuffled;
}

// Cevap doğruysa veritabanına işleyelim (Opsiyonel ama istatistik için iyi)
export async function recordResult(wordId: string, isCorrect: boolean) {
  const supabase = await createClient();

  // Basitçe sayaç artıralım (RPC kullanmadan manuel update)
  // Not: Eşzamanlılık (Concurrency) sorunu olabilir ama tek kullanıcı için sorun yok.
  if (!isCorrect) {
    // Yanlış sayısını artır
    // SQL ile atomik artış yapmak daha doğru ama şimdilik client-side logic yeterli
    /* Gerçek projede buraya rpc fonksiyonu yazardık: 
       increment_mistake(row_id)
     */
  }
}

export async function getFlashcards() {
  const supabase = await createClient();

  // Rastgele 50 kelime çekelim
  const { data, error } = await supabase
    .from("vocabulary")
    .select("id, word, meaning_tr, example_sentence, type, article, plural")
    .limit(50);

  if (error || !data) return [];

  // Shuffle (Karıştırma)
  return data.sort(() => 0.5 - Math.random());
}

export async function getVerbsForGame() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("vocabulary")
    .select("*")
    .eq("type", "verb")
    .not("conjugation", "is", null);

  if (!data) return [];
  return data.sort(() => 0.5 - Math.random());
}
