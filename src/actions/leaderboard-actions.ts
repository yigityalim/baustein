"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function getLeaderboardAction() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const activeGroupId = cookieStore.get("active_group_id")?.value;

  // Eğer grup seçili değilse boş dön (Veya global sıralama yapılabilir ama şimdilik grup odaklı gidelim)
  if (!activeGroupId) return [];

  // 1. Bu gruptaki üyelerin ID'lerini al
  const { data: members, error: memberError } = await supabase
    .from("group_members")
    .select("user_id")
    .eq("group_id", activeGroupId);

  if (memberError || !members) return [];

  const memberIds = members.map((m) => m.user_id);

  if (memberIds.length === 0) return [];

  // 2. Bu ID'lerin Profillerini (XP, Username) çek ve sırala
  const { data: leaderboard, error: profileError } = await supabase
    .from("profiles")
    .select("id, username, xp, current_streak, avatar_url")
    .in("id", memberIds as string[])
    .order("xp", { ascending: false })
    .limit(10); // İlk 10 kişi

  if (profileError) return [];

  return leaderboard;
}
