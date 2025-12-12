"use client";

import { Loader2, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getNounsForGame, registerWordPractice } from "@/actions/game-actions";
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

type Word = {
  id: string;
  word: string;
  meaning_tr: string;
  article: "der" | "die" | "das" | null;
  example_sentence: string | null;
};

export function ArticleGame() {
  const [words, setWords] = useState<Word[]>([]);
  const [solvedWords, setSolvedWords] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "result">("playing");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    loadGame();
  }, []);

  async function loadGame() {
    setLoading(true);
    const data = await getNounsForGame();
    setWords(data as Word[]);
    setCurrentIndex(0);
    setScore(0);
    setGameState("playing");
    setLoading(false);
  }

  const handleGuess = (guess: "der" | "die" | "das") => {
    const currentWord = words[currentIndex];
    const isCorrect = guess === currentWord.article;

    setFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      if (isCorrect) {
        toast.success("Richtig! (Doğru)", { duration: 800 });
        setScore((s) => s + 1);
      } else {
        toast.error(
          `Falsch! Doğrusu: ${currentWord.article?.toUpperCase()} ${currentWord.word}`,
          { duration: 1500 },
        );
        registerWordPractice(currentWord.id, false);
      }

      if (solvedWords.has(currentWord.id)) {
        toast.success("Doğru! (Tekrar olduğu için XP yok)", { duration: 1000 });
      } else {
        toast.success("Richtig! +10 XP", { duration: 800 });
        registerWordPractice(currentWord.id, true);

        setSolvedWords((prev) => new Set(prev).add(currentWord.id));
      }

      setTimeout(
        () => {
          setFeedback(null);
          if (currentIndex < words.length - 1) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            setGameState("result");
          }
        },
        isCorrect ? 600 : 1200,
      );
    }, 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="p-10 text-center">
        <h3 className="font-bold text-lg">Kelime Bulunamadı</h3>
        <p className="mb-4 text-muted-foreground">
          Önce veritabanına biraz "İsim" (Noun) ekle.
        </p>
        <Button variant="outline" asChild>
          <a href="/add">Kelime Ekle</a>
        </Button>
      </div>
    );
  }

  if (gameState === "result") {
    return (
      <Card className="mx-auto py-10 w-full max-w-md text-center">
        <CardTitle className="mb-4 text-2xl">Oyun Bitti!</CardTitle>
        <CardContent>
          <div className="mb-2 font-bold text-primary text-4xl">
            {score} / {words.length}
          </div>
          <p className="text-muted-foreground">Doğru cevapladın.</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={loadGame}>
            <RefreshCcw className="mr-2 w-4 h-4" /> Tekrar Oyna
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  return (
    <div className="flex flex-col gap-6 mx-auto max-w-2xl">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-muted-foreground text-sm">
          <span>
            {currentIndex + 1} / {words.length}
          </span>
          <span className="font-semibold text-foreground">✓ {score} Doğru</span>
        </div>
        <div className="bg-muted rounded-full w-full h-2 overflow-hidden">
          <div
            className="bg-card rounded-full h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Card */}
      <Card
        className={cn(
          "relative shadow-2xl border-2 overflow-hidden transition-all duration-300",
          feedback === "correct" &&
            "border-green-500 bg-green-50 dark:bg-green-950",
          feedback === "wrong" && "border-red-500 bg-red-50 dark:bg-red-950",
          !feedback && "animate-in fade-in slide-in-from-bottom-4 duration-500",
        )}
      >
        <CardHeader className="pb-4 text-center">
          <Badge variant="secondary" className="mx-auto w-fit text-xs">
            Artikel Trainer
          </Badge>
        </CardHeader>

        <CardContent className="flex flex-col justify-center items-center py-16 min-h-[280px] text-center">
          <div className="space-y-4">
            <h2 className="font-extrabold text-6xl md:text-7xl tracking-tight">
              {currentWord.word}
            </h2>
            <p className="font-medium text-muted-foreground text-2xl">
              {currentWord.meaning_tr}
            </p>
          </div>
        </CardContent>

        <CardFooter className="gap-4 grid grid-cols-3 p-6 pt-4">
          <Button
            size="lg"
            disabled={feedback !== null}
            className={cn(
              "h-20 font-bold text-white text-xl hover:scale-105 active:scale-95 transition-all duration-200",
              "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
            )}
            onClick={() => handleGuess("der")}
          >
            DER
          </Button>

          <Button
            size="lg"
            disabled={feedback !== null}
            className={cn(
              "h-20 font-bold text-white text-xl hover:scale-105 active:scale-95 transition-all duration-200",
              "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
            )}
            onClick={() => handleGuess("die")}
          >
            DIE
          </Button>

          <Button
            size="lg"
            disabled={feedback !== null}
            className={cn(
              "h-20 font-bold text-white text-xl hover:scale-105 active:scale-95 transition-all duration-200",
              "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800",
            )}
            onClick={() => handleGuess("das")}
          >
            DAS
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
