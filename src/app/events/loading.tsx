import EventsSkeleton from "@/components/events-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

// Shown automatically by Next.js while /events is loading
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Skeleton className="h-10 w-72" />
      <Skeleton className="mt-3 h-5 w-96 max-w-full" />
      <Skeleton className="mt-10 h-10 w-full" />
      <div className="mt-8">
        <EventsSkeleton />
      </div>
    </div>
  );
}
