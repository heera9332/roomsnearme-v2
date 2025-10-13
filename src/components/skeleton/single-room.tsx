import { Card } from "../ui/card";

// --- tiny skeleton primitives ---
function SkeletonBox({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className || ''}`} style={style} />
}

function Lines({ rows = 3, className = '' }: { rows?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonBox key={i} className={i === 0 ? 'h-5 w-3/4' : 'h-4 w-full'} />
      ))}
    </div>
  )
}
// --- page-level skeleton that mirrors the final layout ---
export function RoomPageSkeleton() {
  return (
    <div className="mt-16 p-4 max-w-7xl mx-auto" aria-busy="true" aria-live="polite">
      <SkeletonBox className="h-8 w-2/3 mb-4" /> {/* title */}
      <div className="grid grid-cols-12 gap-4">
        {/* Main */}
        <div className="col-span-12 md:col-span-9 space-y-4">
          {/* hero/gallery */}
          <div className="relative w-full overflow-hidden rounded-lg shadow-sm" style={{ aspectRatio: '4 / 3' }}>
            <SkeletonBox className="absolute inset-0" />
          </div>

          {/* About */}
          <Card className="p-4">
            <SkeletonBox className="h-6 w-28 mb-3" />
            <Lines rows={5} />
          </Card>

          {/* details grid */}
          <Card className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <SkeletonBox className="h-4 w-32" />
                  <SkeletonBox className="h-4 w-24" />
                </div>
              ))}
            </div>
          </Card>

          {/* amenities */}
          <Card className="p-4">
            <SkeletonBox className="h-5 w-28 mb-3" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonBox key={i} className="h-6 w-20" />
              ))}
            </div>
          </Card>

          {/* map */}
          <Card className="p-4">
            <SkeletonBox className="h-6 w-24 mb-3" />
            <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '16 / 9' }}>
              <SkeletonBox className="absolute inset-0" />
            </div>
            <SkeletonBox className="h-4 w-40 mt-3" />
          </Card>

          {/* reviews */}
          <Card className="p-4">
            <SkeletonBox className="h-6 w-24 mb-3" />
            <Lines rows={3} />
          </Card>

          {/* related rooms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div style={{ aspectRatio: '4 / 3' }} className="relative">
                  <SkeletonBox className="absolute inset-0" />
                </div>
                <div className="p-3">
                  <SkeletonBox className="h-5 w-2/3 mb-2" />
                  <SkeletonBox className="h-4 w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3 space-y-4">
          <Card className="p-4">
            <SkeletonBox className="h-6 w-40 mb-3" />
            <SkeletonBox className="h-8 w-full mb-3" />
            <SkeletonBox className="h-64 w-full mb-3" />
            <SkeletonBox className="h-8 w-full mb-3" />
            <SkeletonBox className="h-8 w-24 mb-3" />
            <SkeletonBox className="h-10 w-full" />
          </Card>

          <Card className="p-4">
            <SkeletonBox className="h-6 w-20 mb-2" />
            <Lines rows={2} />
          </Card>
        </div>
      </div>
    </div>
  )
}