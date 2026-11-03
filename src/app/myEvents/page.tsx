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

function MyEventsList() {
  const [events, setEvents] = useState<IEvent[] | null>(null); // null = still loading

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await authFetch("/myEvents");
        if (!res.ok) throw new Error("Failed to load");
        setEvents(await res.json());
      } catch {
        toast.error("Could not load your events");
        setEvents([]);
      }
    }
    loadEvents();
  }, []);

  if (events === null) return <EventsSkeleton />;

  // manage = true shows the Edit and Delete buttons on every card
  return (
    <EventsExplorer
      events={events}
      manage
      emptyMessage="You have not created any events yet."
    />
  );
}

export default function MyEventsPage() {
  return (
    <PrivateRoute>
      <div className="mx-auto max-w-6xl px-4 py-13">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-brand">Manage Events</h1>
            <p className="mt-2 text-muted-foreground">Edit or delete the events you created.</p>
          </div>
          <Link href="/newEvent" className={buttonVariants({ size: "lg", className: "h-10" })}>
            <FiPlus /> Create new event
          </Link>
        </div>

        <div className="mt-10">
          <MyEventsList />
        </div>
      </div>
    </PrivateRoute>
  );
}
