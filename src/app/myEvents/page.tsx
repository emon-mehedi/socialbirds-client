import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/components/types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyEventsExplorer from "@/components/my-events-explorer";

export default async function MyEventsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user.email;
  const res = await fetch(`${process.env.BACKEND_SERVER_URI}/myEvents/${email}`, {
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
        <Button asChild size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800">
          <Link href="/newEvent"><FiPlus /> Create new event</Link>
        </Button>
      </div>

      {/* Search + pills + grid */}
      <div className="mt-10">
        <MyEventsExplorer events={events} />
      </div>
    </div>
  );
}
