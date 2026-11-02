"use client";
import { useState } from "react";
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
import { getToken } from "@/lib/get-token";

export default function MyEventCard({ event }: { event: IEvent }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...event });

  const [eventData, setEventData] = useState(event);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URI}/events/${eventData._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setDeleted(true);
  };

  const handleEdit = async () => {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URI}/events/${eventData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setEventData({ ...form });
      setOpen(false);
    }
  };

  if (deleted) return null;

  return (
    <div className="h-full flex flex-col">
      <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-lg flex flex-col">
        <div className="relative aspect-[16/10] bg-slate-100">
          <img src={eventData.thumbnailImageUrl} alt={eventData.title} className="h-full w-full object-cover" />
          <Badge className="absolute left-3 top-3 bg-white text-emerald-700 hover:bg-white">{eventData.category}</Badge>
        </div>
        <CardHeader className="pt-5">
          <CardTitle className="text-lg">{eventData.title}</CardTitle>
          <CardDescription className="line-clamp-2">{eventData.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1.5 py-4 text-sm text-slate-600">
          <p className="flex items-center gap-2"><FiMapPin className="shrink-0 text-emerald-600" /><span className="truncate">{eventData.location}</span></p>
          <p className="flex items-center gap-2"><FiCalendar className="shrink-0 text-emerald-600" />{eventData.date}</p>
        </CardContent>
        <div className="p-4 pt-0 mt-auto flex gap-2">
          <Link href={`/events/${eventData._id}`} className="flex-1 text-center rounded-md bg-emerald-600 text-white px-4 py-2 text-sm hover:bg-emerald-700">View</Link>
          <button onClick={() => setOpen(true)} className="flex-1 rounded-md bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700">Edit</button>
          <button onClick={handleDelete} className="flex-1 rounded-md bg-red-600 text-white px-4 py-2 text-sm hover:bg-red-700">Delete</button>
        </div>
      </Card>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl space-y-3">
            <h3 className="text-lg font-bold">Edit Event</h3>
            {['title','description','category','location','date','thumbnailImageUrl'].map((key) => (
              <input key={key} className="w-full border rounded px-3 py-2" value={(form as any)[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={key} />
            ))}
            <div className="flex gap-2">
              <button onClick={handleEdit} className="flex-1 bg-emerald-600 text-white py-2 rounded">Save</button>
              <button onClick={() => setOpen(false)} className="flex-1 bg-slate-300 text-black py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
