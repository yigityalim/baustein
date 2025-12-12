import type { Metadata } from "next";
import { FlashCardGame } from "@/components/practice/flash-card";

export const metadata: Metadata = {
  title: "Flashcards",
  description:
    "Kelime hazınınızı flashcard'larla test edin. Almanca-Türkçe çeviri pratikleri.",
};

export default function FlashcardsPage() {
  return (
    <div className="px-4 md:px-6 py-6 md:py-10 max-w-4xl container">
      <div className="mb-6 md:mb-10 text-center">
        <h1 className="font-bold text-2xl md:text-3xl tracking-tight">
          Flashcards
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Kelime hazineni test et. Kartın üzerine tıkla ve çevir.
        </p>
      </div>

      <FlashCardGame />
    </div>
  );
}
