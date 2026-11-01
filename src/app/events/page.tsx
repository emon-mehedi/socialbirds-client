import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import EventsExplorer from "@/components/events-explorer";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/components/types";

export default async function EventsPage() {
  const res = await fetch(`${process.env.BACKEND_SERVER_URI}/events`, {
    next: { revalidate: 60 }
  });
  const events = await res.json() as IEvent[];
  console.log(res);

  

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Create event button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-emerald-800">Find an event to join</h1>
          <p className="mt-2 text-slate-600">Pick a type of help, search by place, and open any event for details.</p>
        </div>
        <Button size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800">
          <Link href="/newEvent"><FiPlus /> Create new event</Link>
        </Button>
      </div>

      {/* Search + pills + grid */}
      <div className="mt-10">
        <EventsExplorer events={events} />
      </div>
    </div>
  );
}
