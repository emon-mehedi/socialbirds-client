"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EventForm from "@/components/event-form";
import PrivateRoute from "@/components/PrivateRoute";
import { authFetch } from "@/lib/auth-fetch";
import type { EventValues } from "@/lib/validation";

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (values: EventValues) => {
    setLoading(true);
    try {
      // the server adds the creator's email from the token
      const res = await authFetch("/events", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Could not create the event");
        return;
      }

      toast.success("Event created successfully!");
      router.push("/events");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-4xl font-extrabold text-brand">Create an event</h1>
        <p className="mt-2 text-muted-foreground">Tell people what you are planning and where to meet.</p>

        <div className="mt-8 rounded-2xl border bg-card p-6">
          <EventForm submitLabel="Publish event" loading={loading} onSubmit={handleCreate} />
        </div>
      </div>
    </PrivateRoute>
  );
}
