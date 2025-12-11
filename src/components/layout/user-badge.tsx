import { Flame, Zap } from "lucide-react";
import { getUserProfileAction } from "@/actions/profile-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export async function UserBadge() {
  const profile = await getUserProfileAction();

  if (!profile) return null;

  return (
    <div className="flex items-center gap-3 bg-muted/30 p-1.5 pr-4 border border-border/50 rounded-full">
      <Avatar className="border-2 border-background w-8 h-8">
        <AvatarImage src={profile.avatar_url || ""} />
        <AvatarFallback className="bg-primary font-bold text-primary-foreground text-xs">
          {profile.username?.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex items-center gap-3 text-sm">
        <span className="hidden md:inline-block font-semibold">
          {profile.username}
        </span>

        <div className="hidden md:block bg-border w-px h-4" />

        <div
          className="flex items-center gap-1 text-orange-500"
          title="Günlük Seri"
        >
          <Flame className="fill-orange-500 w-4 h-4" />
          <span className="font-mono font-bold">{profile.current_streak}</span>
        </div>

        <div
          className="flex items-center gap-1 text-yellow-500"
          title="Toplam XP"
        >
          <Zap className="fill-yellow-500 w-4 h-4" />
          <span className="font-mono font-bold">{profile.xp}</span>
        </div>
      </div>
    </div>
  );
}
