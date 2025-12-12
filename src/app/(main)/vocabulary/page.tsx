import { Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditWordDialog } from "@/components/vocabulary/edit-word-dialog";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sözlüğüm",
  description:
    "Almanca kelime dağarcığınız. Tüm öğrendiğiniz kelimeleri, artikellerini ve çoğul formlarını görüntüleyin.",
  openGraph: {
    title: "Sözlüğüm | Baustein",
    description: "Almanca kelime dağarcığınızı görüntüleyin.",
  },
};

// ISR: Her 30 saniyede bir sayfayı yeniden oluştur
export const revalidate = 30;

export default async function VocabularyPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const supabase = await createClient();
  const query = (await searchParams)?.query || "";

  let dbQuery = supabase
    .from("vocabulary")
    .select("*")
    .order("created_at", { ascending: false });

  if (query) {
    dbQuery = dbQuery.ilike("word", `%${query}%`);
  }

  const { data: words } = await dbQuery;

  return (
    <div className="space-y-6 px-4 md:px-6 py-6 md:py-8 max-w-7xl container">
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl tracking-tight">
            Sözlüğüm
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Toplam {words?.length || 0} kelime listeleniyor.
          </p>
        </div>

        <form className="flex items-center space-x-2 w-full md:w-auto">
          <Input
            name="query"
            placeholder="Kelime ara..."
            defaultValue={query}
            className="w-full md:w-[300px]"
          />
          <Button type="submit" size="icon" variant="secondary">
            <Search className="w-4 h-4" />
          </Button>
          {query && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden sm:inline-flex"
            >
              <Link href="/vocabulary">Temizle</Link>
            </Button>
          )}
        </form>
      </div>

      <div className="hidden md:block bg-card border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Kelime</TableHead>
              <TableHead>Tür</TableHead>
              <TableHead>Artikel</TableHead>
              <TableHead>Anlamı</TableHead>
              <TableHead className="hidden lg:table-cell">
                Örnek Cümle
              </TableHead>
              <TableHead className="text-right">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!words || words.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Kelime bulunamadı. Hemen ekle!
                </TableCell>
              </TableRow>
            ) : (
              words.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-bold text-lg">
                    {item.word}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {item.type}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {item.article ? (
                      <Badge
                        className={`
                        ${item.article === "der" ? "bg-blue-600 hover:bg-blue-700" : ""}
                        ${item.article === "die" ? "bg-red-600 hover:bg-red-700" : ""}
                        ${item.article === "das" ? "bg-green-600 hover:bg-green-700" : ""}
                      `}
                      >
                        {item.article}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </TableCell>

                  <TableCell>{item.meaning_tr}</TableCell>

                  <TableCell className="hidden lg:table-cell text-muted-foreground text-sm italic">
                    {item.example_sentence || "-"}
                  </TableCell>

                  <TableCell className="text-right">
                    <EditWordDialog word={item} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-3">
        {!words || words.length === 0 ? (
          <div className="bg-card p-8 border rounded-lg text-center">
            <p className="text-muted-foreground">
              Kelime bulunamadı. Hemen ekle!
            </p>
          </div>
        ) : (
          words.map((item) => (
            <div
              key={item.id}
              className="space-y-3 bg-card p-4 border rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.word}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.meaning_tr}
                  </p>
                </div>
                <EditWordDialog word={item} />
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="capitalize">
                  {item.type}
                </Badge>
                {item.article && (
                  <Badge
                    className={`
                    ${item.article === "der" ? "bg-blue-600" : ""}
                    ${item.article === "die" ? "bg-red-600" : ""}
                    ${item.article === "das" ? "bg-green-600" : ""}
                  `}
                  >
                    {item.article}
                  </Badge>
                )}
              </div>

              {item.example_sentence && (
                <p className="pt-2 border-t text-muted-foreground text-sm italic">
                  {item.example_sentence}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
