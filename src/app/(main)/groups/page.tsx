import { LogOut, Users } from "lucide-react";
import { leaveGroupAction } from "@/actions/group-actions";
import { CreateGroupForm } from "@/components/groups/create-group-form";
import { JoinGroupForm } from "@/components/groups/join-group-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export default async function GroupsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <div>Giriş yapmalısın.</div>;

  // Üyesi olduğum grupları çek
  const { data: myGroups } = await supabase
    .from("group_members")
    .select(`
      joined_at,
      study_groups (
        id,
        name,
        join_code,
        created_by,
        group_members (count)
      )
    `)
    .eq("user_id", user.id);

  return (
    <div className="space-y-6 md:space-y-8 mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl container">
      <div className="flex md:flex-row flex-col justify-between items-start gap-4">
        <div>
          <h1 className="font-bold text-3xl">Çalışma Gruplarım</h1>
          <p className="text-muted-foreground">
            Arkadaşlarınla ortak kelime havuzu ve rekabet alanı.
          </p>
        </div>
      </div>

      <div className="gap-8 grid md:grid-cols-2">
        {/* SOL: YENİ GRUP İŞLEMLERİ */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Yeni Grup Kur</CardTitle>
              <CardDescription>
                Sınıf arkadaşların için bir alan oluştur.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateGroupForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gruba Katıl</CardTitle>
              <CardDescription>
                Arkadaşının verdiği davet kodunu gir.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JoinGroupForm />
            </CardContent>
          </Card>
        </div>

        {/* SAĞ: MEVCUT GRUPLARIM */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Üye Olduğun Gruplar</h3>

          {(!myGroups || myGroups.length === 0) && (
            <div className="p-8 border-2 border-dashed rounded-xl text-muted-foreground text-center">
              Henüz bir grubun yok.
            </div>
          )}

          {myGroups?.map((membership: any) => {
            const group = membership.study_groups;
            // Tip güvenliği için group_members bir dizi array geliyor, count'u alalım
            const memberCount = group.group_members[0]?.count || 1;

            return (
              <Card key={group.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {group.name}
                        {group.created_by === user.id && (
                          <Badge>Yöneticisin</Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Users className="w-3 h-3" /> {memberCount} Üye
                      </CardDescription>
                    </div>

                    <form
                      action={async () => {
                        "use server";
                        await leaveGroupAction(group.id);
                      }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-destructive/10 text-destructive"
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center bg-muted p-3 rounded-md font-mono text-sm">
                    <span>
                      Davet Kodu:{" "}
                      <strong className="text-primary">
                        {group.join_code}
                      </strong>
                    </span>
                    {/* Copy butonu client component gerektirir, şimdilik basit bırakalım */}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
