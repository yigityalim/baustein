"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Profile = {
  id: string;
  username: string | null;
  xp: number | null;
  current_streak: number | null;
  avatar_url: string | null;
};

type UserBadgeDropdownProps = {
  currentUser: Profile;
  groupMembers: Profile[];
};

export function UserBadgeDropdown({
  currentUser,
  groupMembers,
}: UserBadgeDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 bg-muted/30 hover:bg-muted/50 px-3 py-1.5 border rounded-full focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-colors"
        >
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={currentUser.avatar_url || ""}
              alt={currentUser.username || "User"}
            />
            <AvatarFallback className="text-xs">
              {(currentUser.username || "??").substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">{currentUser.username}</span>
          <span className="text-xs">🔥 {currentUser.current_streak || 0}</span>
          <span className="text-xs">⚡ {currentUser.xp || 0}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          {groupMembers.length > 0
            ? `Grup Üyeleri (${groupMembers.length})`
            : "Profil"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {groupMembers.length === 0 ? (
          <DropdownMenuItem disabled className="text-muted-foreground">
            Henüz bir grupta değilsin
          </DropdownMenuItem>
        ) : (
          groupMembers.map((member, index) => (
            <DropdownMenuItem
              key={member.id}
              className="flex items-center gap-3 px-3 py-2"
            >
              <div className="flex flex-1 items-center gap-2">
                {index < 3 && (
                  <span className="text-base">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                  </span>
                )}
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={member.avatar_url || ""}
                    alt={member.username || "User"}
                  />
                  <AvatarFallback className="text-xs">
                    {(member.username || "??").substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">
                    {member.username}
                    {member.id === currentUser.id && (
                      <span className="ml-1 text-muted-foreground">(Sen)</span>
                    )}
                  </span>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <span>🔥 {member.current_streak || 0}</span>
                    <span>⚡ {member.xp || 0}</span>
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
