"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/auth-fetch";
import { useSession } from "@/lib/auth-client";

// Join / Leave button on the event details page
export default function JoinButton({ eventId, isPast }: { eventId: string; isPast: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const userId = session?.user?.id;

  // joined
  const [joined, setJoined] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  // ask if already joined this event
  useEffect(() => {
    if (!userId) return;

    async function checkJoined() {
      try {
        const res = await authFetch(`/joinedEvents/check/${eventId}`);
        const data = await res.json();
        setJoined(Boolean(data.joined));
      } catch {
        setJoined(false);
      }
    }
    checkJoined();
  }, [userId, eventId]);

  const isJoined = userId ? joined : false;
  const checking = isPending || (!!userId && joined === null);

  const handleClick = async () => {
    // not logged in -> go to login, then come back here
    if (!userId) {
      toast.info("Please login to join this event");
      router.push(`/signIn?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    setBusy(true);
    try {
      const res = isJoined
        ? await authFetch(`/joinedEvents/${eventId}`, { method: "DELETE" })
        : await authFetch("/joinedEvents", {
            method: "POST",
            body: JSON.stringify({ eventId }),
          });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      setJoined(!isJoined);
      toast.success(isJoined ? "You left this event" : "You joined this event. See you there!");
      router.refresh(); // reloads the page data so the participant count updates
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (isPast) {
    return (
      <Button size="lg" disabled className="mt-6 h-10 w-full">
        This event has ended
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      variant={isJoined ? "destructive" : "default"}
      disabled={checking || busy}
      className="mt-6 h-10 w-full"
      onClick={handleClick}
    >
      {checking ? "Loading..." : busy ? "Please wait..." : isJoined ? "Leave Event" : "Join Event"}
    </Button>
  );
}
