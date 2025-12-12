"use client";

import { CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type QuizCardProps = {
  topic: string;
  questions: Question[];
};

export function QuizCard({ topic, questions }: QuizCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = questions[currentIdx];

  const handleSelect = (option: string) => {
    if (selectedOption) return; // Zaten seçtiyse engelle
    setSelectedOption(option);

    if (option === currentQ.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <Card className="bg-primary/5 mx-auto border-2 border-primary/20 w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Bitti! 🎉</CardTitle>
          <CardDescription>Sonuçların burada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="font-bold text-primary text-5xl">
            {score} / {questions.length}
          </div>
          <p className="text-muted-foreground">
            {score === questions.length
              ? "Harika iş çıkardın!"
              : "Biraz daha pratik yapmalısın."}
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={() => window.location.reload()} variant="outline">
            <RefreshCw className="mr-2 w-4 h-4" /> Yeni Konu İste
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-md my-4 border-l-4 border-l-blue-500 w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Quiz: {topic}</CardTitle>
          <Badge variant="secondary">
            {currentIdx + 1} / {questions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-medium text-lg">{currentQ.question}</p>

        <div className="gap-2 grid">
          {currentQ.options.map((option) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQ.correctAnswer;

            // Renk Mantığı:
            // Seçili DEĞİLSE -> gri
            // Seçili ve DOĞRUYSA -> yeşil
            // Seçili ve YANLIŞSA -> kırmızı
            // Seçili değil ama DOĞRU CEVAPSA (kullanıcı yanlışı seçtiğinde doğrusunu göstermek için) -> yeşil

            let btnStyle = "justify-start text-left h-auto py-3 px-4";
            if (selectedOption) {
              if (option === currentQ.correctAnswer) {
                btnStyle +=
                  " bg-green-100 border-green-500 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400";
              } else if (isSelected && !isCorrect) {
                btnStyle +=
                  " bg-red-100 border-red-500 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400";
              } else {
                btnStyle += " opacity-50";
              }
            }

            return (
              <Button
                key={option}
                variant="outline"
                className={btnStyle}
                onClick={() => handleSelect(option)}
                disabled={!!selectedOption}
              >
                {option}
                {selectedOption && option === currentQ.correctAnswer && (
                  <CheckCircle2 className="ml-auto w-4 h-4 text-green-600" />
                )}
                {selectedOption &&
                  isSelected &&
                  option !== currentQ.correctAnswer && (
                    <XCircle className="ml-auto w-4 h-4 text-red-600" />
                  )}
              </Button>
            );
          })}
        </div>

        {selectedOption && (
          <div className="bg-muted mt-4 p-3 rounded-md text-sm animate-in fade-in">
            <span className="font-bold">Açıklama: </span>
            {currentQ.explanation}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {selectedOption && (
          <Button className="w-full" onClick={handleNext}>
            {currentIdx < questions.length - 1 ? "Sonraki Soru" : "Bitir"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
