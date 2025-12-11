"use client";

import { Flame, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { getLeaderboardAction } from "@/actions/leaderboard-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNotification } from "@/hooks/use-notification";
import { createClient } from "@/lib/supabase/client";

type Player = {
  id: string;
  username: string;
  xp: number;
  current_streak: number;
  avatar_url: string | null;
};

export function LeaderboardCard() {
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { sendNotification, permission } = useNotification();
  const supabase = createClient();

  useEffect(() => {
    async function initData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);

      const initialData = await getLeaderboardAction();
      setLeaderboard(initialData as Player[]);
    }
    initData();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("leaderboard-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "user_profiles",
        },
        async () => {
          // Önceki sıramı kaydet
          const myOldRank = leaderboard.findIndex(
            (player) => player.id === currentUserId,
          );

          // Yeni veriyi çek
          const newData = await getLeaderboardAction();
          setLeaderboard(newData as Player[]);

          // Yeni sıramı bul
          const myNewRank = newData.findIndex(
            (player) => player.id === currentUserId,
          );

          // Eğer biri beni geçtiyse bildirim gönder
          if (
            myOldRank !== -1 &&
            myNewRank !== -1 &&
            myNewRank > myOldRank &&
            permission === "granted"
          ) {
            const whoPassedMe = newData[myOldRank];
            sendNotification("🏆 Dikkat!", {
              body: `${whoPassedMe?.username || "Biri"} seni geçti! Hemen çalışmaya başla.`,
              tag: "leaderboard-change",
            });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaderboard, currentUserId, permission, sendNotification]);

  if (leaderboard.length === 0) {
    return (
      <Card className="flex flex-col border-dashed h-full">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-muted-foreground text-base">
            <Trophy className="w-5 h-5" /> Liderlik Tablosu
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center items-center">
          <p className="text-muted-foreground text-sm text-center">
            Henüz veri yok veya bir grupta değilsin.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col border-2 border-primary/10 h-full overflow-hidden">
      <CardHeader className="space-y-0 pb-0">
        <div className="flex justify-between items-start">
          <div className="space-y-0.5">
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Canlı Sıralama
            </CardTitle>
            <CardDescription className="text-xs">
              Anlık güncellenir
            </CardDescription>
          </div>
          <div className="relative flex mt-1 w-2.5 h-2.5">
            <span className="inline-flex absolute bg-green-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
            <span className="inline-flex relative bg-green-500 rounded-full w-2.5 h-2.5"></span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <div className="divide-y">
          {leaderboard.map((player, index) => {
            const isMe = player.id === currentUserId;

            let rankDisplay: React.ReactNode;
            if (index === 0) rankDisplay = <span className="text-2xl">🥇</span>;
            else if (index === 1)
              rankDisplay = <span className="text-2xl">🥈</span>;
            else if (index === 2)
              rankDisplay = <span className="text-2xl">🥉</span>;
            else
              rankDisplay = (
                <span className="w-6 font-semibold text-muted-foreground text-sm text-center">
                  {index + 1}
                </span>
              );

            return (
              <div
                key={player.id}
                className={`flex items-center justify-between px-4 py-2.5 transition-colors
                  ${isMe ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-muted/40"}`}
              >
                <div className="flex flex-1 items-center gap-3 min-w-0">
                  <div className="flex justify-center items-center w-8 shrink-0">
                    {rankDisplay}
                  </div>

                  <Avatar className="border-2 border-background w-10 h-10 shrink-0">
                    <AvatarImage src={player.avatar_url || ""} />
                    <AvatarFallback className="bg-primary/10 font-semibold text-primary text-xs">
                      {player.username?.substring(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col flex-1 min-w-0">
                    <span
                      className={`font-medium text-sm truncate ${isMe ? "text-primary" : ""}`}
                    >
                      {player.username || "Anonim"}{" "}
                      {isMe && (
                        <span className="opacity-70 text-xs">(Sen)</span>
                      )}
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Flame className="fill-orange-500 w-3.5 h-3.5 text-orange-500" />
                      <span>{player.current_streak} gün</span>
                    </div>
                  </div>
                </div>

                <Badge
                  variant={index < 3 ? "default" : "secondary"}
                  className="ml-2 font-mono text-xs shrink-0"
                >
                  {player.xp.toLocaleString()} XP
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
