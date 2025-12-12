import type { Metadata } from "next";
import { VerbTrainer } from "@/components/practice/verb-trainer";

export const metadata: Metadata = {
  title: "Fiil Çekimi",
  description:
    "Almanca fiil çekimlerini pratik edin. Ich bin, du bist, er/sie/es ist... Tüm fiil formlarını öğrenin.",
};

export default function VerbsPage() {
  return (
    <div className="space-y-6 md:space-y-8 mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl container">
      <VerbTrainer />
    </div>
  );
}
