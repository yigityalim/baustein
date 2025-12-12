export default function DashboardLoading() {
  return (
    <div className="space-y-6 md:space-y-8 mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl container">
      {/* Header Skeleton */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="bg-muted rounded-md w-48 h-8 animate-pulse" />
          <div className="bg-muted rounded-md w-64 h-4 animate-pulse" />
        </div>
        <div className="bg-muted rounded-md w-40 h-10 animate-pulse" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3 bg-card p-6 border rounded-lg">
            <div className="flex justify-between items-center">
              <div className="bg-muted rounded-md w-24 h-4 animate-pulse" />
              <div className="bg-muted rounded-full w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-muted rounded-md w-16 h-8 animate-pulse" />
            <div className="bg-muted rounded-md w-32 h-3 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Practice & Leaderboard Skeleton */}
      <div className="gap-4 md:gap-6 grid md:grid-cols-12">
        <div className="md:col-span-7 lg:col-span-8">
          <div className="space-y-4 bg-card p-6 border rounded-lg h-full">
            <div className="bg-muted rounded-md w-48 h-6 animate-pulse" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-muted/50 p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-muted rounded-full w-10 h-10 animate-pulse" />
                    <div className="space-y-2">
                      <div className="bg-muted rounded-md w-32 h-4 animate-pulse" />
                      <div className="bg-muted rounded-md w-48 h-3 animate-pulse" />
                    </div>
                  </div>
                  <div className="bg-muted rounded-md w-20 h-9 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-5 lg:col-span-4">
          <div className="space-y-4 bg-card p-6 border rounded-lg">
            <div className="bg-muted rounded-md w-32 h-6 animate-pulse" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-muted rounded-md w-6 h-6 animate-pulse" />
                  <div className="bg-muted rounded-full w-8 h-8 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="bg-muted rounded-md w-24 h-4 animate-pulse" />
                    <div className="bg-muted rounded-md w-16 h-3 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Cards Skeleton */}
      <div className="gap-4 grid md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-4 bg-card p-6 border rounded-lg">
            <div className="bg-muted rounded-md w-32 h-6 animate-pulse" />
            <div className="space-y-3">
              <div className="bg-muted rounded-md w-full h-16 animate-pulse" />
              <div className="bg-muted rounded-md w-full h-16 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
