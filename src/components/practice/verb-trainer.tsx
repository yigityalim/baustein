"use client";

import { ArrowRight, Loader2, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getVerbsForGame } from "@/actions/game-actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "../../lib/utils";

const PRONOUNS = [
  { label: "ich", key: "ich" },
  { label: "du", key: "du" },
  { label: "er/sie/es", key: "er_sie_es" },
  { label: "wir", key: "wir" },
  { label: "ihr", key: "ihr" },
  { label: "sie/Sie", key: "sie_Sie" },
];

export function VerbTrainer() {
  const [verbs, setVerbs] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPronoun, setCurrentPronoun] = useState(PRONOUNS[0]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    loadGame();
  }, []);

  async function loadGame() {
    setLoading(true);
    const data = await getVerbsForGame();
    setVerbs(data);
    if (data.length > 0) pickRandomPronoun();
    setLoading(false);
  }

  const pickRandomPronoun = () => {
    const random = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];
    setCurrentPronoun(random);
    setUserInput("");
    setStatus("idle");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    window.speechSynthesis.speak(utterance);
  };

  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const currentVerb = verbs[currentIndex];
    const correctAnswer = currentVerb.conjugation[currentPronoun.key];

    if (
      userInput.toLowerCase().trim() === correctAnswer?.toLowerCase().trim()
    ) {
      setStatus("success");
      toast.success("Richtig!");
      playAudio(correctAnswer);
    } else {
      setStatus("error");
      toast.error(`Falsch! Doğrusu: ${correctAnswer}`);
    }
  };

  const nextCard = () => {
    if (currentIndex < verbs.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      pickRandomPronoun();
    } else {
      setCurrentIndex(0);
      pickRandomPronoun();
      toast.info("Tur bitti, başa dönüldü.");
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center">
        <Loader2 className="inline animate-spin" />
      </div>
    );
  if (verbs.length === 0)
    return (
      <div className="p-10 text-center">Önce çekimli fiil eklemelisin!</div>
    );

  const verb = verbs[currentIndex];

  return (
    <div className="space-y-8 mx-auto max-w-md">
      <Card
        className={cn(
          "p-8 border-2 text-center transition-colors duration-300",
          {
            "border-gray-300 dark:border-gray-700": status === "idle",
            "border-green-500 bg-green-50 dark:bg-green-900/20":
              status === "success",
          },
        )}
      >
        <div className="mb-6">
          <div className="flex justify-center items-center gap-2 mb-2">
            <h2 className="font-bold text-3xl capitalize">{verb.word}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => playAudio(verb.word)}
            >
              <Volume2 className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
          <p className="text-muted-foreground">{verb.meaning_tr}</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="bg-secondary px-4 py-1 rounded-full font-medium text-xl">
            {currentPronoun.label}
          </span>

          <form onSubmit={checkAnswer} className="relative w-full">
            <Input
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="..."
              className="h-14 font-medium text-xl text-center"
              autoFocus
              disabled={status === "success"}
            />
          </form>
        </div>
      </Card>

      {status === "success" && (
        <Button
          className="slide-in-from-bottom-4 w-full h-12 text-lg animate-in fade-in"
          onClick={nextCard}
        >
          Sıradaki <ArrowRight className="ml-2" />
        </Button>
      )}

      <div className="text-muted-foreground text-sm text-center">
        Fiil {currentIndex + 1} / {verbs.length}
      </div>
    </div>
  );
}
