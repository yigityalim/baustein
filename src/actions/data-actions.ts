"use server";

import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/database.types";

export type ExportData = {
  version: string;
  exportDate: string;
  vocabulary: Array<
    Omit<
      Tables<"vocabulary">,
      | "id"
      | "user_id"
      | "created_at"
      | "updated_at"
      | "correct_count"
      | "last_practiced_at"
      | "mistake_count"
    >
  >;
  notes: Array<
    Omit<Tables<"notes">, "id" | "user_id" | "created_at" | "updated_at">
  >;
};

export async function exportUserData(): Promise<ExportData | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Kelimeleri çek
  const { data: vocabulary } = await supabase
    .from("vocabulary")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  // Notları çek
  const { data: notes } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  // ID ve timestamp alanlarını çıkar
  const cleanedVocabulary = (vocabulary || []).map(
    ({
      id,
      user_id,
      created_at,
      updated_at,
      correct_count,
      last_practiced_at,
      mistake_count,
      ...rest
    }) => rest,
  );
  const cleanedNotes = (notes || []).map(
    ({ id, user_id, created_at, updated_at, ...rest }) => rest,
  );

  return {
    version: "1.0",
    exportDate: new Date().toISOString(),
    vocabulary: cleanedVocabulary,
    notes: cleanedNotes,
  };
}

export async function importUserData(
  data: ExportData,
): Promise<{ success: boolean; message: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Kullanıcı bulunamadı" };
  }

  try {
    // Kelimeleri import et
    if (data.vocabulary && data.vocabulary.length > 0) {
      const vocabularyToInsert = data.vocabulary.map((item) => ({
        ...item,
        user_id: user.id,
      }));

      const { error: vocabError } = await supabase
        .from("vocabulary")
        .insert(vocabularyToInsert);

      if (vocabError) throw vocabError;
    }

    // Notları import et
    if (data.notes && data.notes.length > 0) {
      const notesToInsert = data.notes.map((item) => ({
        ...item,
        user_id: user.id,
      }));

      const { error: notesError } = await supabase
        .from("notes")
        .insert(notesToInsert);

      if (notesError) throw notesError;
    }

    return {
      success: true,
      message: `${data.vocabulary?.length || 0} kelime ve ${data.notes?.length || 0} not başarıyla yüklendi`,
    };
  } catch (error) {
    console.error("Import error:", error);
    return {
      success: false,
      message: "Veriler yüklenirken bir hata oluştu",
    };
  }
}
