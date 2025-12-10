"use server";

import { createClient } from "@/lib/supabase/server";

export async function getSentences(topic?: string) {
  const supabase = await createClient();

  let query = supabase.from("sentences").select("*");

  if (topic) {
    query = query.eq("topic", topic);
  }

  const { data, error } = await query;

  if (error) return [];

  // Karıştırıp gönderelim
  return data.sort(() => 0.5 - Math.random());
}
