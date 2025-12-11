import { AddNoteDialog } from "@/components/notes/add-note-dialog";
import { NoteCard } from "@/components/notes/note-card";
import { createClient } from "@/lib/supabase/server";

export default async function NotesPage() {
  const supabase = await createClient();

  const { data: notes } = await supabase
    .from("notes")
    .select("*")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 md:space-y-8 mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl container">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Ders Notları</h1>
          <p className="text-muted-foreground">
            Derste aldığın hızlı notlar ve kurallar.
          </p>
        </div>
        <AddNoteDialog />
      </div>

      <div className="gap-4 space-y-4 columns-1 md:columns-2 lg:columns-3">
        {!notes?.length ? (
          <div className="col-span-full py-10 text-muted-foreground text-center">
            Henüz notun yok. "Hızlı Not" butonuna bas.
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="mb-4 break-inside-avoid">
              <NoteCard note={note} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
