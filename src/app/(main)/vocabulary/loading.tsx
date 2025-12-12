export default function VocabularyLoading() {
  return (
    <div className="space-y-6 px-4 md:px-6 py-6 md:py-8 max-w-7xl container">
      {/* Header Skeleton */}
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
        <div className="space-y-2">
          <div className="bg-muted rounded-md w-40 h-8 animate-pulse" />
          <div className="bg-muted rounded-md w-56 h-4 animate-pulse" />
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-muted rounded-md md:w-64 h-10 animate-pulse" />
          <div className="bg-muted rounded-md w-24 h-10 animate-pulse" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted/50 p-4 border-b">
          <div className="flex gap-4">
            <div className="bg-muted rounded-md w-32 h-4 animate-pulse" />
            <div className="bg-muted rounded-md w-24 h-4 animate-pulse" />
            <div className="bg-muted rounded-md w-40 h-4 animate-pulse" />
            <div className="bg-muted rounded-md w-32 h-4 animate-pulse" />
          </div>
        </div>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="flex gap-4 bg-card hover:bg-muted/50 p-4 border-b last:border-b-0"
          >
            <div className="bg-muted rounded-md w-32 h-4 animate-pulse" />
            <div className="bg-muted rounded-md w-24 h-4 animate-pulse" />
            <div className="bg-muted rounded-md w-40 h-4 animate-pulse" />
            <div className="bg-muted rounded-md w-32 h-4 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
