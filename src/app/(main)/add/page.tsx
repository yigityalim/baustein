import { WordForm } from "@/components/vocabulary/word-form";

export default function AddWordPage() {
  return (
    <div className="mx-auto px-4 md:px-6 py-6 md:py-10 max-w-2xl">
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="font-bold text-2xl md:text-3xl tracking-tight">
          Yeni Kelime Ekle
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Bugün derste ne öğrendin? Hemen kaydet, sonra unutursun.
        </p>
      </div>

      <WordForm />
    </div>
  );
}
