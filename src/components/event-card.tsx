import Link from "next/link";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IEvent } from "./types";

// Reusable card. Pass it one event: <EventCard event={event} />
export default function EventCard({ event }: { event: IEvent }) {
  return (
    <div className="h-full flex flex-col">
      <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-lg flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] bg-slate-100">
          <img
            src={event.thumbnailImageUrl}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <Badge className="absolute left-3 top-3 bg-white text-emerald-700 hover:bg-white">
            {event.category}
          </Badge>
        </div>

        {/* Title + description */}
        <CardHeader className="pt-5">
          <CardTitle className="text-lg">{event.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {event.description}
          </CardDescription>
        </CardHeader>

        {/* Location + date */}
        <CardContent className="space-y-1.5 py-4 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <FiMapPin className="shrink-0 text-emerald-600" />
            <span className="truncate">{event.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <FiCalendar className="shrink-0 text-emerald-600" />
            {(event.date)}
          </p>
        </CardContent>
        <div className="p-4 pt-0 mt-auto">
          <Link href={`/events/${event._id}`} className="inline-block w-full text-center rounded-md bg-emerald-600 text-white px-4 py-2 text-sm hover:bg-emerald-700">View</Link>
        </div>
      </Card>
    </div>
  );
}
