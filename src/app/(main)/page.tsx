import {
  BookOpen,
  BrainCircuit,
  FlaskConical,
  Gamepad2,
  PlusCircle,
  StickyNote,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { getDashboardStats } from "@/actions/vocabulary-actions";
import { DataManagement } from "@/components/data-management";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6 md:space-y-8 mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl container">
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Guten Tag! 👋</h1>
          <p className="text-muted-foreground">
            Almanca yolculuğunda bugün ne yapıyoruz?
          </p>
        </div>
        <Link href="/add">
          <Button className="bg-primary">
            <PlusCircle className="mr-2 w-4 h-4" /> Yeni Kelime Ekle
          </Button>
        </Link>
      </div>

      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Toplam Kelime</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.totalCount}</div>
            <p className="text-muted-foreground text-xs">
              veritabanında kayıtlı
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              İsimler (Nouns)
            </CardTitle>
            <div className="bg-blue-100 border border-blue-300 rounded-full w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.nounCount}</div>
            <p className="text-muted-foreground text-xs">
              Artikel çalışabilirsin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Fiiller (Verbs)
            </CardTitle>
            <div className="bg-red-100 border border-red-300 rounded-full w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.verbCount}</div>
            <p className="text-muted-foreground text-xs">
              Çekim ezberi gerekli
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Aktivite</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">%100</div>
            <p className="text-muted-foreground text-xs">
              Almanca öğrenme modun açık!
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Alıştırma Merkezi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center bg-card hover:bg-accent/50 p-4 border rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <Gamepad2 className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <h4 className="font-semibold">Artikel Oyunu</h4>
                  <p className="text-muted-foreground text-sm">
                    Der, Die, Das reflekslerini geliştir.
                  </p>
                </div>
              </div>
              <Link href="/practice/articles">
                <Button variant="secondary">Başla</Button>
              </Link>
            </div>

            <div className="flex justify-between items-center bg-card hover:bg-accent/50 p-4 border rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full">
                  <BrainCircuit className="w-6 h-6 text-orange-700 dark:text-orange-300" />
                </div>
                <div>
                  <h4 className="font-semibold">Flashcards</h4>
                  <p className="text-muted-foreground text-sm">
                    Kelime hazineni ve anlamlarını test et.
                  </p>
                </div>
              </div>
              <Link href="/practice/flashcards">
                <Button variant="secondary">Başla</Button>
              </Link>
            </div>

            <div className="gap-4 grid grid-cols-2 pt-2">
              <Link href="/practice/sentences" className="col-span-1">
                <div className="flex flex-col justify-between space-y-3 bg-card hover:bg-accent/50 p-4 border rounded-lg h-full text-center transition-colors cursor-pointer">
                  <div className="flex justify-center items-center bg-purple-100 dark:bg-purple-900 mx-auto rounded-full w-10 h-10">
                    <span className="font-bold text-purple-700 dark:text-purple-300 text-lg">
                      abc
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Cümle Kur</h4>
                    <p className="mt-1 text-muted-foreground text-xs">
                      Ja/Nein Fragen
                    </p>
                  </div>
                </div>
              </Link>

              <Link href="/practice/numbers" className="col-span-1">
                <div className="flex flex-col justify-between space-y-3 bg-card hover:bg-accent/50 p-4 border rounded-lg h-full text-center transition-colors cursor-pointer">
                  <div className="flex justify-center items-center bg-yellow-100 dark:bg-yellow-900 mx-auto rounded-full w-10 h-10">
                    <span className="font-bold text-yellow-700 dark:text-yellow-300 text-lg">
                      42
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Sayılar</h4>
                    <p className="mt-1 text-muted-foreground text-xs">
                      0-99 Trainer
                    </p>
                  </div>
                </div>
              </Link>

              <Link href="/practice/verbs" className="col-span-1">
                <div className="flex flex-col justify-between space-y-3 bg-card hover:bg-accent/50 p-4 border rounded-lg h-full text-center transition-colors cursor-pointer">
                  <div className="flex justify-center items-center bg-red-100 dark:bg-red-900 mx-auto rounded-full w-10 h-10">
                    <span className="font-bold text-red-700 dark:text-red-300 text-lg">
                      Sein
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Fiil Çekimi</h4>
                    <p className="mt-1 text-muted-foreground text-xs">
                      Ich bin, du bist...
                    </p>
                  </div>
                </div>
              </Link>

              <div className="col-span-2 pt-2">
                <Link href="/practice/grammar">
                  <div className="flex justify-between items-center bg-linear-to-r from-slate-900 hover:from-slate-800 to-slate-800 hover:to-slate-700 shadow-md p-4 border rounded-lg w-full text-white transition cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/10 p-2 rounded-full">
                        <FlaskConical className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">
                          Gramer Laboratuvarı
                        </h4>
                        <p className="text-slate-300 text-xs">
                          Negation, Smalltalk & W-Fragen
                        </p>
                      </div>
                    </div>
                    <span className="bg-white/20 px-3 py-1 rounded font-medium text-xs">
                      Yeni
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Hızlı Erişim</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Link href="/notes">
              <div className="flex justify-between items-center bg-card hover:bg-accent/50 p-4 border rounded-lg transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                    <StickyNote className="w-5 h-5 text-yellow-700 dark:text-yellow-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Notlarım</h4>
                    <p className="text-muted-foreground text-xs">
                      Öğrenme notları ve ipuçları
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Aç
                </Button>
              </div>
            </Link>
            <Link href="/vocabulary">
              <div className="flex justify-between items-center bg-card hover:bg-accent/50 p-4 border rounded-lg transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <BookOpen className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Sözlüğüm</h4>
                    <p className="text-muted-foreground text-xs">
                      Tüm kelimelerim
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Görüntüle
                </Button>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Son Eklenenler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentWords.length === 0 ? (
                <p className="py-4 text-muted-foreground text-sm text-center">
                  Henüz kelime yok.
                </p>
              ) : (
                stats.recentWords.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center pb-2 last:pb-0 last:border-0 border-b"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.word}</span>
                      {item.article && (
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1 py-0 
                          ${item.article === "der" ? "border-blue-500 text-blue-500" : ""}
                          ${item.article === "die" ? "border-red-500 text-red-500" : ""}
                          ${item.article === "das" ? "border-green-500 text-green-500" : ""}
                        `}
                        >
                          {item.article}
                        </Badge>
                      )}
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {item.meaning_tr}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management Section */}
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1">
          <DataManagement />
        </div>
      </div>
    </div>
  );
}
