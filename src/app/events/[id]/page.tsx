import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiMapPin } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import JoinButton from "@/components/join-button";


export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);

  const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URI}/events/${id}`,{
    cache: "force-cache"
  });
  const event = await res.json();

  // Show the 404 page if no event has this id
  if (!event) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/events" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline">
        <FiArrowLeft /> All events
      </Link>

      <img src={event.thumbnailImageUrl} alt={event.title} className="mt-6 aspect-[16/8] w-full rounded-3xl object-cover" />

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_280px]">
        {/* Left: title and description */}
        <div>
          <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">{event.category}</Badge>
          <h1 className="mt-3 text-4xl font-extrabold text-emerald-800">{event.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-700">{event.description}</p>
        </div>

        {/* Right: date, location and join button */}
        <aside className="h-fit rounded-2xl border p-6">
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><FiCalendar className="mt-0.5 text-lg text-emerald-600" /> {(event.date)}</li>
            <li className="flex gap-3"><FiMapPin className="mt-0.5 text-lg text-emerald-600" /> {event.location}</li>
          </ul>
          <JoinButton event={event}/>
        </aside>
      </div>
    </article>
  );
}
