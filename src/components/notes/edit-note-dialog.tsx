"use client";

import { Pencil, X } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { updateNoteAction } from "@/actions/note-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Tables } from "@/types/database.types";

type Note = Tables<"notes">;

const COLORS = [
  { label: "Varsayılan", value: "bg-card" },
  {
    label: "Sarı",
    value: "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200",
  },
  { label: "Kırmızı", value: "bg-red-50 dark:bg-red-900/10 border-red-200" },
  { label: "Mavi", value: "bg-blue-50 dark:bg-blue-900/10 border-blue-200" },
  {
    label: "Yeşil",
    value: "bg-green-50 dark:bg-green-900/10 border-green-200",
  },
];

export function EditNoteDialog({ note }: { note: Note }) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(note.color || "bg-card");
  const [tags, setTags] = useState<string[]>(note.tags || []);
  const [state, formAction, isPending] = useActionState(updateNoteAction, {
    message: "",
    success: null,
  });

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      toast.success("Not güncellendi!");
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-blue-50 md:group-hover:opacity-100 md:opacity-0 w-6 h-6 text-blue-500 transition-opacity"
        >
          <Pencil className="w-3.5 h-3.5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Notu Düzenle</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={note.id} />
          <input type="hidden" name="color" value={color} />

          <div className="space-y-2">
            <Input
              name="title"
              placeholder="Başlık"
              className="font-semibold"
              defaultValue={note.title || ""}
            />
          </div>

          <div className="space-y-2">
            <Textarea
              name="content"
              placeholder="Not içeriği..."
              className="min-h-[150px] font-mono text-base resize-none"
              required
              defaultValue={note.content}
            />
          </div>

          <div className="space-y-2">
            <Input
              name="tags"
              placeholder="Etiketler: gramer, sınav, kelime (Virgülle ayır)"
              className="text-sm"
              onKeyDown={(e) => {
                if (e.key === "," || e.key === "Enter") {
                  e.preventDefault();
                  const input = e.currentTarget;
                  const value = input.value.trim();
                  if (value && !tags.includes(value)) {
                    setTags([...tags, value]);
                    input.value = "";
                  }
                }
              }}
            />
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={`edit-${tag}-${tags.indexOf(tag)}`}
                  className="flex items-center gap-1 bg-primary px-2 py-1 rounded-full text-primary-foreground text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                    className="hover:opacity-70 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <input type="hidden" name="tags" value={tags.join(",")} />
          </div>

          <div className="flex gap-2 pt-2">
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setColor(c.value)}
                className={cn(
                  "shadow-sm border rounded-full w-6 h-6 transition-all cursor-pointer",
                  c.value,
                  color === c.value && "ring ring-primary ring-offset-2",
                )}
                title={c.label}
              />
            ))}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Güncelleniyor..." : "Güncelle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
