import Link from "next/link";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { IEvent } from "./types";

export default function EventCard({ event }: { event: IEvent }) {
  return (
    <Card className="h-full gap-0 py-0 transition-shadow hover:shadow-lg">
      {/* Thumbnail (same size for every card) */}
      <div className="relative aspect-[16/10] bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.thumbnailImageUrl} alt={event.title} className="h-full w-full object-cover" />
        <Badge className="absolute left-3 top-3 bg-background text-brand">{event.category}</Badge>
      </div>

      {/* Title + description */}
      <CardHeader className="pt-5">
        <CardTitle className="line-clamp-1 text-lg">{event.title}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-10">{event.description}</CardDescription>
      </CardHeader>

      {/* Location + date */}
      <CardContent className="space-y-1.5 py-4 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <FiMapPin className="shrink-0 text-primary" />
          <span className="truncate">{event.location}</span>
        </p>
        <p className="flex items-center gap-2">
          <FiCalendar className="shrink-0 text-primary" />
          {formatDate(event.date)}
        </p>
      </CardContent>

      {/* mt-auto keeps the button at the bottom, so all cards look equal */}
      <div className="mt-auto p-4 pt-0">
        <Link href={`/events/${event._id}`} className={buttonVariants({ size: "lg", className: "h-9 w-full" })}>
          View Event
        </Link>
      </div>
    </Card>
  );
}
