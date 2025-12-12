import type { Metadata } from "next";
import { WordForm } from "@/components/vocabulary/word-form";

export const metadata: Metadata = {
  title: "Kelime Ekle",
  description:
    "Yeni Almanca kelimeler ekleyin. Artikel, çoğul form, anlam ve örnek cümlelerle kelime hazınınızı genişletin.",
};

export default function AddPage() {
  return (
    <div className="space-y-6 md:space-y-8 mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl container">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="font-bold text-3xl tracking-tight">Yeni Kelime Ekle</h1>
        <p className="text-muted-foreground">Kelime hazineni genişlet.</p>
      </div>

      <WordForm />
    </div>
  );
}
