import type { Metadata } from "next";
import { NumberTrainer } from "@/components/practice/number-trainer";

export const metadata: Metadata = {
  title: "Sayılar Trainer",
  description:
    "Almanca sayıları öğrenin. 0-99 arası sayıları telaffuz ve yazım pratikleri.",
};

export default function NumbersPage() {
  return (
    <div className="px-4 py-10 container">
      <NumberTrainer />
    </div>
  );
}
