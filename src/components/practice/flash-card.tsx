"use client";

import { ArrowRight, Loader2, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getFlashcards } from "@/actions/game-actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FlashCardGame() {
  const [cards, setCards] = useState<Awaited<ReturnType<typeof getFlashcards>>>(
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getFlashcards();
      setCards(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 200);
  };

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (cards.length === 0)
    return <div className="p-10 text-center">Önce kelime eklemelisin!</div>;

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col items-center space-y-8 mx-auto max-w-md">
      <div className="flex justify-between w-full text-muted-foreground text-sm">
        <span>
          Kart {currentIndex + 1} / {cards.length}
        </span>
        <span>Tip: {currentCard.type}</span>
      </div>

      <button
        type="button"
        className="group w-full h-[350px] perspective-[1000px] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={cn(
            "relative w-full h-full transform-3d transition-all duration-500",
            isFlipped ? "transform-[rotateY(180deg)]" : "",
          )}
        >
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <Card className="flex flex-col justify-center items-center shadow-xl p-6 border-2 hover:border-primary/50 h-full text-center transition-colors">
              <span className="top-4 right-4 absolute flex items-center gap-1 text-muted-foreground text-xs">
                <RotateCw size={12} /> Çevir
              </span>

              <h2 className="mb-4 font-bold text-4xl">
                {currentCard.article && (
                  <span
                    className={cn(
                      "mr-2 font-light text-2xl",
                      currentCard.article === "der" ? "text-blue-500" : "",
                      currentCard.article === "die" ? "text-red-500" : "",
                      currentCard.article === "das" ? "text-green-500" : "",
                    )}
                  >
                    {currentCard.article}
                  </span>
                )}
                {currentCard.word}
              </h2>

              {currentCard.example_sentence && (
                <p className="mt-4 text-muted-foreground text-lg italic">
                  "{currentCard.example_sentence}"
                </p>
              )}
            </Card>
          </div>

          <div className="absolute inset-0 w-full h-full transform-[rotateY(180deg)] backface-hidden">
            <Card className="flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-900 shadow-inner p-6 border-2 h-full text-center">
              <h3 className="mb-2 font-semibold text-muted-foreground text-sm uppercase tracking-widest">
                Anlamı
              </h3>
              <p className="font-bold text-primary text-3xl">
                {currentCard.meaning_tr}
              </p>

              {currentCard.plural && (
                <div className="bg-background mt-6 p-2 border rounded text-sm">
                  <span className="font-semibold">Çoğul:</span>{" "}
                  {currentCard.plural}
                </div>
              )}
            </Card>
          </div>
        </div>
      </button>

      <div className="flex gap-4 w-full">
        <Button
          className="w-full h-12 text-lg"
          variant="secondary"
          onClick={handleNext}
        >
          Sıradaki Kart <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
}
