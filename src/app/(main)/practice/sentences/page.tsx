import { SentenceBuilder } from "@/components/practice/sentence-builder";

export default async function SentencesPage({
  searchParams,
}: {
  searchParams?: Promise<{ topic?: string }>;
}) {
  const topic = (await searchParams)?.topic || "ja_nein";

  return (
    <div className="py-10 container">
      {/* Başlığı Dinamik Yapalım */}
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
