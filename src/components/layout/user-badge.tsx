import { getLeaderboardAction } from "@/actions/leaderboard-actions";
import { getUserProfileAction } from "@/actions/profile-actions";
import { UserBadgeDropdown } from "./user-badge-dropdown";

export async function UserBadge() {
  const profile = await getUserProfileAction();
  const groupMembers = await getLeaderboardAction();

  if (!profile) return null;

  return (
    <UserBadgeDropdown currentUser={profile} groupMembers={groupMembers} />
  );
}
