export default function GroupsLoading() {
  return (
    <div className="space-y-6 md:space-y-8 mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl container">
      {/* Header Skeleton */}
      <div className="flex md:flex-row flex-col justify-between items-start gap-4">
        <div className="space-y-2">
          <div className="bg-muted rounded-md w-64 h-8 animate-pulse" />
          <div className="bg-muted rounded-md w-80 h-4 animate-pulse" />
        </div>
      </div>

      {/* Two Column Grid Skeleton */}
      <div className="gap-8 grid md:grid-cols-2">
        {/* Left Card */}
        <div className="space-y-4 bg-card p-6 border rounded-lg">
          <div className="space-y-2">
            <div className="bg-muted rounded-md w-48 h-6 animate-pulse" />
            <div className="bg-muted rounded-md w-full h-4 animate-pulse" />
          </div>
          <div className="space-y-3 pt-4">
            <div className="bg-muted rounded-md w-full h-10 animate-pulse" />
            <div className="bg-muted rounded-md w-full h-10 animate-pulse" />
          </div>
        </div>

        {/* Right Card */}
        <div className="space-y-4 bg-card p-6 border rounded-lg">
          <div className="space-y-2">
            <div className="bg-muted rounded-md w-48 h-6 animate-pulse" />
            <div className="bg-muted rounded-md w-full h-4 animate-pulse" />
          </div>
          <div className="space-y-3 pt-4">
            <div className="bg-muted rounded-md w-full h-20 animate-pulse" />
            <div className="bg-muted rounded-md w-full h-20 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
