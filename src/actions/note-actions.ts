"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { TablesInsert, TablesUpdate } from "@/types/database.types";

const noteSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, "Not boş olamaz"),
  tags: z.string().optional(),
  is_pinned: z.boolean().optional(),
  color: z.string().optional(),
});

type ActionState = {
  success: boolean | null;
  message: string;
};

export async function addNoteAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient();

  const tagsString = formData.get("tags") as string;
  const rawData = {
    title: (formData.get("title") as string) || "",
    content: formData.get("content") as string,
    tags: tagsString,
    color: (formData.get("color") as string) || "bg-card",
    is_pinned: formData.get("is_pinned") === "on",
  };

  // Validation
  const validatedData = noteSchema.safeParse(rawData);
  if (!validatedData.success) {
    return {
      success: false,
      message: validatedData.error.issues[0].message,
    };
  }

  // Convert tags to array
  const tagsArray = tagsString
    ? tagsString
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const noteData: TablesInsert<"notes"> = {
    title: validatedData.data.title || null,
    content: validatedData.data.content,
    tags: tagsArray,
    color: validatedData.data.color || "bg-card",
    is_pinned: validatedData.data.is_pinned || false,
  };

  const { error } = await supabase.from("notes").insert([noteData]);

  if (error) {
    console.error("Note insert error:", error);
    return { success: false, message: "Not kaydedilemedi" };
  }

  revalidatePath("/notes");
  return { success: true, message: "Not kaydedildi" };
}

export async function updateNoteAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const tagsString = formData.get("tags") as string;

  const rawData = {
    title: (formData.get("title") as string) || "",
    content: formData.get("content") as string,
    tags: tagsString,
    color: formData.get("color") as string,
  };

  // Validation
  const validatedData = noteSchema.safeParse(rawData);
  if (!validatedData.success) {
    return {
      success: false,
      message: validatedData.error.issues[0].message,
    };
  }

  // Convert tags to array
  const tagsArray = tagsString
    ? tagsString
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const updateData: TablesUpdate<"notes"> = {
    title: validatedData.data.title || null,
    content: validatedData.data.content,
    tags: tagsArray,
    color: validatedData.data.color,
  };

  const { error } = await supabase
    .from("notes")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Note update error:", error);
    return { success: false, message: "Not güncellenemedi" };
  }

  revalidatePath("/notes");
  return { success: true, message: "Not güncellendi" };
}

export async function deleteNoteAction(id: string) {
  const supabase = await createClient();
  await supabase.from("notes").delete().eq("id", id);
  revalidatePath("/notes");
}

export async function togglePinAction(id: string, currentStatus: boolean) {
  const supabase = await createClient();
  await supabase
    .from("notes")
    .update({ is_pinned: !currentStatus })
    .eq("id", id);
  revalidatePath("/notes");
}
