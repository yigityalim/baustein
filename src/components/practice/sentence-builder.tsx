"use client";

import { ArrowRight, CheckCircle2, Lightbulb, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSentences } from "@/actions/sentence-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Topic prop'unu alıyoruz
export function SentenceBuilder({ topic = "ja_nein" }: { topic?: string }) {
  const [sentences, setSentences] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Topic değişince oyunu yenile
  useEffect(() => {
    loadGame();
  }, [topic]);

  async function loadGame() {
    setLoading(true);
    const data = await getSentences(topic);
    setSentences(data);
    if (data.length > 0) prepareRound(data[0]);
    setLoading(false);
  }

  const prepareRound = (sentenceObj: any) => {
    // Kelimeleri boşluktan ayır
    const words = sentenceObj.content.split(" ");
    setScrambledWords([...words].sort(() => 0.5 - Math.random()));
    setSelectedWords([]);
    setIsCorrect(null);
  };

  const handleWordClick = (word: string, index: number) => {
    setSelectedWords([...selectedWords, word]);
    const newScrambled = [...scrambledWords];
    newScrambled.splice(index, 1);
    setScrambledWords(newScrambled);
  };

  const handleSelectedClick = (word: string, index: number) => {
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setScrambledWords([...scrambledWords, word]);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const userSentence = selectedWords.join(" ");
    const correctSentence = sentences[currentIndex].content;

    if (userSentence === correctSentence) {
      setIsCorrect(true);
      toast.success("Richtig! (Doğru)");
    } else {
      setIsCorrect(false);
      toast.error("Falsch! (Yanlış)");
    }
  };

  const nextQuestion = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      prepareRound(sentences[currentIndex + 1]);
    } else {
      toast.info("Bu konudaki tüm cümleler bitti!");
      loadGame();
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center gap-2 p-10 text-center">
        <RefreshCw className="animate-spin" /> Yükleniyor...
      </div>
    );
  if (sentences.length === 0)
    return (
      <div className="p-10 text-center">Bu konuda henüz cümle eklenmemiş.</div>
    );

  const currentSentence = sentences[currentIndex];

  return (
    <div className="space-y-8 mx-auto max-w-2xl">
      <div className="space-y-3 bg-slate-50 dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
        {currentSentence.hint && (
          <div className="flex justify-center">
            <Badge
              variant={
                currentSentence.hint.includes("Resmi")
                  ? "default"
                  : currentSentence.hint.includes("Samimi")
                    ? "secondary"
                    : currentSentence.hint.includes("Olumsuz")
                      ? "destructive"
                      : "outline"
              }
              className="gap-1 mb-2 px-3 py-1 text-sm"
            >
              <Lightbulb className="w-3 h-3" /> {currentSentence.hint}
            </Badge>
          </div>
        )}

        <h2 className="font-medium text-muted-foreground text-lg">Türkçesi:</h2>
        <p className="font-bold text-primary text-3xl">
          "{currentSentence.meaning_tr}"
        </p>
      </div>

      <Card
        className={`min-h-[100px] flex flex-row flex-wrap items-center justify-center p-6 gap-2 border-2 transition-all duration-300
        ${isCorrect === true ? "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]" : ""}
        ${isCorrect === false ? "border-red-500 bg-red-50 dark:bg-red-900/20 shadow-[0_0_20px_rgba(239,68,68,0.3)]" : "border-dashed border-slate-300"}
      `}
      >
        {selectedWords.length === 0 && (
          <span className="text-muted-foreground text-sm animate-pulse">
            Aşağıdaki kelimelere tıklayarak cümleyi kur...
          </span>
        )}
        {selectedWords.map((word, idx) => (
          <Button
            key={idx}
            variant="secondary"
            className="shadow-sm h-12 text-lg"
            onClick={() => handleSelectedClick(word, idx)}
          >
            {word}
          </Button>
        ))}
      </Card>

      <div className="flex flex-row flex-wrap justify-center items-center gap-3 min-h-[80px]">
        {scrambledWords.map((word, idx) => (
          <Button
            key={idx}
            variant="outline"
            className="border-slate-300 hover:border-primary h-12 hover:text-primary text-lg transition-colors"
            onClick={() => handleWordClick(word, idx)}
          >
            {word}
          </Button>
        ))}
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <Button
          variant="ghost"
          onClick={() => prepareRound(currentSentence)}
          className="flex-1"
        >
          <RefreshCw className="mr-2 w-4 h-4" /> Sıfırla
        </Button>

        {isCorrect === true ? (
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={nextQuestion}
          >
            Sıradaki <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        ) : (
          <Button
            className="flex-1"
            onClick={checkAnswer}
            disabled={scrambledWords.length > 0}
          >
            <CheckCircle2 className="mr-2 w-4 h-4" /> Kontrol Et
          </Button>
        )}
      </div>
    </div>
  );
}
