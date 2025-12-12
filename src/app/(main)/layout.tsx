import { cookies } from "next/headers";
import { getLeaderboardAction } from "@/actions/leaderboard-actions";
import { getUserProfileAction } from "@/actions/profile-actions";
import { SiteHeader } from "@/components/layout/site-header";
import { createClient } from "@/lib/supabase/server";

export default async function MainLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  const cookieStore = await cookies();
  const activeGroupId = cookieStore.get("active_group_id")?.value || null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userGroups: { id: string; name: string }[] = [];
  let userProfile: {
    id: string;
    username: string | null;
    avatar_url: string | null;
    current_streak: number | null;
    xp: number | null;
  } | null = null;
  let groupMembers: {
    id: string;
    username: string | null;
    avatar_url: string | null;
    current_streak: number | null;
    xp: number | null;
  }[] = [];

  if (user) {
    const { data } = await supabase
      .from("group_members")
      .select("study_groups(id, name)")
      .eq("user_id", user.id);

    userGroups = (data?.map((item) => item.study_groups).filter(Boolean) ||
      []) as { id: string; name: string }[];
    userProfile = await getUserProfileAction();
    groupMembers = await getLeaderboardAction();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader
        user={user}
        userGroups={userGroups}
        activeGroupId={activeGroupId}
        userProfile={userProfile}
        groupMembers={groupMembers}
      />

      {/* Main Content */}
      <main className="flex-1 bg-linear-to-br from-background to-muted/20">
        {children}
      </main>
    </div>
  );
}
