'use client'
import { categories } from "@/components/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getToken } from "@/lib/get-token";
import { useRouter } from "next/navigation";


export default function NewEventPage() {
  const router = useRouter();

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent = Object.fromEntries(formData.entries());

    const token = await getToken();
    const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URI}/events`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`   // NEW
      },
      body: JSON.stringify(newEvent)
    });

    const afterSubmit= await res.json();
    if (afterSubmit.insertedId) //insertedId is the _id given by mongoDb
      {
        router.push('/');
      }

  };
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-4xl font-extrabold text-emerald-800">Create an event</h1>
      <p className="mt-2 text-slate-600">Tell people what you are planning and where to meet.</p>

      <form className="mt-8 space-y-5 rounded-2xl border p-6" onSubmit={onSubmit}>
        <div className="space-y-1.5">
          <label htmlFor="title" className="text-sm font-medium">Title</label>
          <Input id="title" name="title" placeholder="Winter blanket drive" />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="description" className="text-sm font-medium">Description</label>
          <Textarea id="description" name="description" rows={5} placeholder="What will volunteers do?" />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="category" className="text-sm font-medium">Event type</label>
          <select id="category" name="category" className="h-9 w-full rounded-md border px-3 text-sm">
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="thumbnailUrl" className="text-sm font-medium">Thumbnail image URL</label>
          <Input id="thumbnailImageUrl" name="thumbnailImageUrl" type="url" placeholder="https://..." />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="location" className="text-sm font-medium">Location</label>
            <Input id="location" name="location" placeholder="Town Hall Square" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="date" className="text-sm font-medium">Date</label>
            <Input id="date" name="date" type="date" />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full bg-emerald-700 text-white hover:bg-emerald-800">
          Publish event
        </Button>
      </form>
    </div>
  );
}
