import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiMapPin, FiUser, FiUsers } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import JoinButton from "@/components/join-button";
import { IEvent } from "@/components/types";
import { API_URL } from "@/lib/api";
import { formatDate, isPastDate } from "@/lib/format";

// Event details (public page - no login needed to look at it)
export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // no-store = always fresh data (so edits and the participant count are up to date)
  const res = await fetch(`${API_URL}/events/${id}`, { cache: "no-store" });

  if (res.status === 404) notFound(); // show the 404 page
  if (!res.ok) throw new Error("Could not load this event"); // shows app/error.tsx

  const event: IEvent = await res.json();
  const isPast = isPastDate(event.date);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/events" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
        <FiArrowLeft /> All events
      </Link>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.thumbnailImageUrl}
        alt={event.title}
        className="mt-6 aspect-[16/8] w-full rounded-3xl bg-muted object-cover"
      />

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_280px]">
        {/* Left: title and description */}
        <div>
          <Badge className="bg-brand-soft text-brand">{event.category}</Badge>
          <h1 className="mt-3 text-4xl font-extrabold text-brand">{event.title}</h1>
          <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        </div>

        {/* Right: date, location and join button */}
        <aside className="h-fit rounded-2xl border bg-card p-6">
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <FiCalendar className="mt-0.5 text-lg text-primary" /> {formatDate(event.date)}
            </li>
            <li className="flex gap-3">
              <FiMapPin className="mt-0.5 text-lg text-primary" /> {event.location}
            </li>
            {event.creatorName && (
              <li className="flex gap-3">
                <FiUser className="mt-0.5 text-lg text-primary" /> Organized by {event.creatorName}
              </li>
            )}
            <li className="flex gap-3">
              <FiUsers className="mt-0.5 text-lg text-primary" />
              {event.participants ?? 0} {event.participants === 1 ? "person has" : "people have"} joined
            </li>
          </ul>
          <JoinButton eventId={event._id} isPast={isPast} />
        </aside>
      </div>
    </article>
  );
}
