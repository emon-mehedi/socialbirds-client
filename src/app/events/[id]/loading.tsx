import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="mt-6 aspect-[16/8] w-full rounded-3xl" />
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-52 w-full rounded-2xl" />
      </div>
    </div>
  );
}
