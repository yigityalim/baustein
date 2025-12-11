"use client";

import { Pin, Trash2 } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { deleteNoteAction, togglePinAction } from "@/actions/note-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Tables } from "@/types/database.types";
import { EditNoteDialog } from "./edit-note-dialog";

type Note = Tables<"notes">;

export function NoteCard({ note }: { note: Note }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPinning, setIsPinning] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    await deleteNoteAction(note.id);
    toast.success("Not silindi");
  };

  const handlePin = async () => {
    if (isPinning) return;
    setIsPinning(true);
    await togglePinAction(note.id, note.is_pinned ?? false);
    setIsPinning(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Az önce";
    if (minutes < 60) return `${minutes}d önce`;
    if (hours < 24) return `${hours}s önce`;
    if (days < 7) return `${days}g önce`;
    return date.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
  };

  return (
    <Card
      className={cn(
        "group relative hover:shadow-md transition-all",
        note.is_pinned &&
          "border-primary/50 border-2 bg-primary/5 dark:bg-primary/10",
        note.color !== "bg-card" && note.color,
        "dark:bg-slate-950 dark:border-slate-700",
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          {note.title && (
            <CardTitle
              className={cn(
                "font-bold dark:text-slate-100 text-lg",
                note.is_pinned ? "text-xl font-semibold" : "",
              )}
            >
              {note.title}
            </CardTitle>
          )}
          <Button
            variant="ghost"
            size="icon"
            disabled={isPinning}
            className={cn(
              "top-2 right-2 absolute w-6 h-6 transition-opacity",
              note.is_pinned
                ? "opacity-100 text-primary rotate-24"
                : "text-muted-foreground md:opacity-0 md:group-hover:opacity-100",
            )}
            onClick={handlePin}
          >
            <Pin className="fill-current w-3 h-3" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="min-h-[60px] text-sm">
        <ReactMarkdown
          components={{
            ul: ({ node, ...props }) => (
              <ul className="space-y-1 my-2 pl-4 list-disc" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="space-y-1 my-2 pl-4 list-decimal" {...props} />
            ),
            h1: ({ node, ...props }) => (
              <h3 className="mt-2 mb-1 font-bold text-lg" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h4 className="mt-2 mb-1 font-bold text-md" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h5 className="mt-2 mb-1 font-bold text-sm" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="my-2 pl-2 border-primary/50 border-l-2 text-muted-foreground italic"
                {...props}
              />
            ),
            a: ({ node, ...props }) => (
              <a
                className="text-primary hover:text-primary/80 underline"
                target="_blank"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p
                className="mb-2 last:mb-0 wrap-break-word leading-relaxed"
                {...props}
              />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-bold text-foreground" {...props} />
            ),
          }}
        >
          {note.content}
        </ReactMarkdown>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 pt-2">
        <div className="flex flex-wrap gap-1 w-full">
          {note.tags?.map((tag: string) => (
            <Badge
              key={`${note.id}-${tag}`}
              variant="secondary"
              className={cn("px-1 py-0 h-5 text-[10px]", note.color)}
            >
              #{tag}
            </Badge>
          ))}
          <div className="flex gap-1 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              disabled={isDeleting}
              className={cn(
                "md:group-hover:opacity-100 md:opacity-0 ml-auto w-6 h-6 text-destructive transition-opacity",
                "hover:bg-destructive/10 dark:hover:bg-destructive/20",
              )}
              onClick={handleDelete}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
            <EditNoteDialog note={note} />
          </div>
        </div>
        <div className="w-full text-[10px] text-muted-foreground">
          {formatDate(note.updated_at)}
        </div>
      </CardFooter>
    </Card>
  );
}
