"use server";

import { createClient } from "@/lib/supabase/server";

export async function getUserProfileAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, xp, current_streak, avatar_url")
    .eq("id", user.id)
    .single();

  return profile;
}
