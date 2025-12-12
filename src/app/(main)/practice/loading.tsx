export default function PracticeLoading() {
  return (
    <div className="px-4 md:px-6 py-6 md:py-10 max-w-4xl container">
      {/* Header Skeleton */}
      <div className="space-y-2 mb-6 md:mb-10 text-center">
        <div className="bg-muted mx-auto rounded-md w-48 h-8 animate-pulse" />
        <div className="bg-muted mx-auto rounded-md w-64 h-4 animate-pulse" />
      </div>

      {/* Practice Card Skeleton */}
      <div className="space-y-6 bg-card mx-auto p-6 md:p-8 border rounded-xl max-w-2xl">
        <div className="space-y-4">
          <div className="bg-muted rounded-md w-full h-64 animate-pulse" />
          <div className="flex justify-between items-center">
            <div className="bg-muted rounded-md w-24 h-4 animate-pulse" />
            <div className="bg-muted rounded-md w-16 h-4 animate-pulse" />
          </div>
        </div>
        <div className="gap-3 grid grid-cols-3 pt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-muted rounded-md w-full h-12 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
