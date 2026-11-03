"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EventForm from "@/components/event-form";
import { authFetch } from "@/lib/auth-fetch";
import { formatDate, isPastDate } from "@/lib/format";
import type { EventValues } from "@/lib/validation";
import { IEvent } from "./types";

export default function MyEventCard({ event }: { event: IEvent }) {
  const [eventData, setEventData] = useState(event);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // delete
  const handleDelete = async () => {
    setSaving(true);
    try {
      const res = await authFetch(`/events/${eventData._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not delete the event");
        return;
      }
      toast.success("Event deleted successfully");
      setDeleteOpen(false);
      setDeleted(true); // hides this card
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // update
  const handleUpdate = async (values: EventValues) => {
    setSaving(true);
    try {
      const res = await authFetch(`/events/${eventData._id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not update the event");
        return;
      }
      toast.success("Event updated successfully");
      setEventData({ ...eventData, ...values }); // show the new values on the card
      setEditOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (deleted) return null;

  return (
    <>
      <Card className="h-full gap-0 py-0 transition-shadow hover:shadow-lg">
        <div className="relative aspect-[16/10] bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={eventData.thumbnailImageUrl} alt={eventData.title} className="h-full w-full object-cover" />
          <Badge className="absolute left-3 top-3 bg-background text-brand">{eventData.category}</Badge>
          {isPastDate(eventData.date) && (
            <Badge variant="destructive" className="absolute right-3 top-3 bg-background">
              Ended
            </Badge>
          )}
        </div>

        <CardHeader className="pt-5">
          <CardTitle className="line-clamp-1 text-lg">{eventData.title}</CardTitle>
          <CardDescription className="line-clamp-2 min-h-10">{eventData.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-1.5 py-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <FiMapPin className="shrink-0 text-primary" />
            <span className="truncate">{eventData.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <FiCalendar className="shrink-0 text-primary" />
            {formatDate(eventData.date)}
          </p>
        </CardContent>

        <div className="mt-auto flex gap-2 p-4 pt-0">
          <Link href={`/events/${eventData._id}`} className={buttonVariants({ className: "h-9 flex-1" })}>
            View
          </Link>
          <Button variant="outline" className="h-9 flex-1" onClick={() => setEditOpen(true)}>
            Edit
          </Button>
          <Button variant="destructive" className="h-9 flex-1" onClick={() => setDeleteOpen(true)}>
            Delete
          </Button>
        </div>
      </Card>

      {/* Edit popup (daisyUI modal) */}
      {editOpen && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box max-w-xl">
            <h3 className="mb-5 text-xl font-bold">Edit event</h3>
            <EventForm
              initialValues={{
                title: eventData.title,
                description: eventData.description,
                category: eventData.category,
                thumbnailImageUrl: eventData.thumbnailImageUrl,
                location: eventData.location,
                date: eventData.date,
              }}
              originalDate={eventData.date}
              submitLabel="Save changes"
              loading={saving}
              onSubmit={handleUpdate}
              onCancel={() => setEditOpen(false)}
            />
          </div>
          <div className="modal-backdrop" onClick={() => setEditOpen(false)} />
        </div>
      )}

      {/* Delete confirmation popup */}
      {deleteOpen && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box max-w-md">
            <h3 className="text-xl font-bold">Delete this event?</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              &quot;{eventData.title}&quot; will be removed for everyone who joined it. This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" size="lg" className="h-9" onClick={() => setDeleteOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" size="lg" className="h-9" disabled={saving} onClick={handleDelete}>
                {saving ? "Deleting..." : "Yes, delete"}
              </Button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDeleteOpen(false)} />
        </div>
      )}
    </>
  );
}
