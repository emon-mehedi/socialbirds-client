import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import EventsExplorer from "@/components/events-explorer";
import { buttonVariants } from "@/components/ui/button";
import { fetchUpcomingEvents } from "@/lib/api";

export default async function EventsPage() {
  const { events, failed } = await fetchUpcomingEvents();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-brand">Upcoming Events</h1>
          <p className="mt-2 text-muted-foreground">
            Pick a type of help, search by place, and open any event for details.
          </p>
        </div>
        <Link href="/newEvent" className={buttonVariants({ size: "lg", className: "h-10" })}>
          <FiPlus /> Create new event
        </Link>
      </div>

      <div className="mt-10">
        {failed ? (
          <p className="mt-12 text-center text-muted-foreground">
            We could not load the events right now. Please refresh the page in a moment.
          </p>
        ) : (
          <EventsExplorer events={events} emptyMessage="No upcoming events yet. Be the first to create one!" />
        )}
      </div>
    </div>
  );
}
