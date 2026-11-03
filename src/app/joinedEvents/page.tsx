"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FiPlus } from "react-icons/fi";
import EventsExplorer from "@/components/events-explorer";
import EventsSkeleton from "@/components/events-skeleton";
import PrivateRoute from "@/components/PrivateRoute";
import { IEvent } from "@/components/types";
import { buttonVariants } from "@/components/ui/button";
import { authFetch } from "@/lib/auth-fetch";

function JoinedEventsList() {
  const [events, setEvents] = useState<IEvent[] | null>(null); // null = still loading

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await authFetch("/joinedEvents"); // already sorted by event date
        if (!res.ok) throw new Error("Failed to load");
        setEvents(await res.json());
      } catch {
        toast.error("Could not load your joined events");
        setEvents([]);
      }
    }
    loadEvents();
  }, []);

  if (events === null) return <EventsSkeleton />;

  return (
    <EventsExplorer
      events={events}
      emptyMessage="You have not joined any events yet. Find one on the Upcoming Events page!"
    />
  );
}

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-brand">Joined Events</h1>
            <p className="mt-2 text-muted-foreground">Events you signed up for, sorted by date.</p>
          </div>
          <Link href="/events" className={buttonVariants({ size: "lg", className: "h-10" })}>
            <FiPlus /> Find more events
          </Link>
        </div>

        <div className="mt-10">
          <JoinedEventsList />
        </div>
      </div>
    </PrivateRoute>
  );
}
