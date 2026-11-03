"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";

// Wrap any page that needs a logged in user:
//   <PrivateRoute> ...page content... </PrivateRoute>
//
// - While we are still checking the session (for example after a page reload)
//   we show a skeleton, so a logged in user is NEVER sent to the login page by mistake.
// - If nobody is logged in, we send them to the login page.
export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) {
      toast.info("Please login to continue");
      router.replace(`/signIn?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, router, pathname]);

  if (isPending || !session) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="mt-3 h-5 w-96 max-w-full" />
        <Skeleton className="mt-10 h-64 w-full" />
      </div>
    );
  }

  return <>{children}</>;
}
