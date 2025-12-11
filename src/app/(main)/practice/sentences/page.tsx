import { SentenceBuilder } from "@/components/practice/sentence-builder";

export default async function SentencesPage({
  searchParams,
}: {
  searchParams?: Promise<{ topic?: string }>;
}) {
  const topic = (await searchParams)?.topic || "ja_nein";

  return (
    <div className="space-y-6 md:space-y-8 mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl container">
      <div className="mb-6 text-center">
        <h1 className="font-bold text-2xl capitalize">
          {topic === "negation"
            ? "🚫 Olumsuzlama Çalışması"
            : topic === "smalltalk"
              ? "💬 Smalltalk & Diyalog"
              : "🔤 Cümle Kurma"}
        </h1>
      </div>

      <SentenceBuilder topic={topic} />
    </div>
  );
}
