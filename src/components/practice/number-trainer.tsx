"use client";

import { Send } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function NumberTrainer() {
  const [currentNumber, setCurrentNumber] = useState(generateNumber());
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function generateNumber() {
    return Math.floor(Math.random() * 100);
  }

  function numberToGerman(num: number): string {
    const ones = [
      "",
      "eins",
      "zwei",
      "drei",
      "vier",
      "fünf",
      "sechs",
      "sieben",
      "acht",
      "neun",
    ];
    const teens = [
      "zehn",
      "elf",
      "zwölf",
      "dreizehn",
      "vierzehn",
      "fünfzehn",
      "sechzehn",
      "siebzehn",
      "achtzehn",
      "neunzehn",
    ];
    const tens = [
      "",
      "",
      "zwanzig",
      "dreißig",
      "vierzig",
      "fünfzig",
      "sechzig",
      "siebzig",
      "achtzig",
      "neunzig",
    ];

    if (num === 0) return "null";
    if (num < 10) return ones[num];
    if (num >= 10 && num < 20) return teens[num - 10];

    const digitOne = num % 10;
    const digitTen = Math.floor(num / 10);

    if (digitOne === 0) return tens[digitTen];
    if (digitOne === 1) return "einund" + tens[digitTen];

    return ones[digitOne] + "und" + tens[digitTen];
  }

  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = numberToGerman(currentNumber);

    if (userInput.toLowerCase().trim() === correctAnswer) {
      toast.success("Doğru! (Richtig)");
      setCurrentNumber(generateNumber());
      setUserInput("");
      inputRef.current?.focus();
    } else {
      toast.error(`Yanlış! Doğrusu: ${correctAnswer}`);
    }
  };

  return (
    <div className="space-y-8 mx-auto max-w-md text-center">
      <div className="space-y-2">
        <h2 className="font-bold text-2xl">Zahlen (Sayılar)</h2>
        <p className="text-muted-foreground">Gördüğün sayıyı Almanca yaz.</p>
      </div>

      <Card className="flex flex-col justify-center items-center bg-accent/20 p-12 border-2 border-primary/10">
        <span className="drop-shadow-sm font-black text-primary text-9xl tracking-tighter">
          {currentNumber}
        </span>
      </Card>

      <form onSubmit={checkAnswer} className="relative space-y-4">
        <Input
          ref={inputRef}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Örn: fünfundvierzig"
          className="pr-12 h-14 font-medium text-xl text-center"
          autoFocus
          autoComplete="off"
        />
        <Button
          type="submit"
          size="icon"
          className="top-2 right-2 absolute w-10 h-10"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>

      <div className="bg-muted p-3 rounded-md text-muted-foreground text-sm text-left">
        <strong>İpucu:</strong> Sayılar küçük harfle ve bitişik yazılır.
        <br />
        45 = <span className="text-primary">fünf</span>und
        <span className="text-primary">vierzig</span> (önce birler, sonra onlar)
      </div>
    </div>
  );
}
