import { ArticleGame } from "@/components/practice/article-game";

export default function ArticleGamePage() {
  return (
    <div className="px-4 md:px-6 py-6 md:py-10 max-w-4xl container">
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="font-bold text-2xl md:text-3xl">Artikel Trainer</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Der, Die veya Das? Hızlıca karar ver.
        </p>
      </div>

      <ArticleGame />
    </div>
  );
}
