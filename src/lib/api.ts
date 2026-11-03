import { IEvent } from "@/components/types";

export const API_URL = (process.env.NEXT_PUBLIC_BACKEND_SERVER_URI || "").replace(/\/$/, "");

export async function fetchUpcomingEvents(limit?: number) {
  try {
    const url = `${API_URL}/events${limit ? `?limit=${limit}` : ""}`;
    // no-store = always fresh, so a newly created event shows up right away
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Bad response");
    const events: IEvent[] = await res.json();
    return { events, failed: false };
  } catch {
    return { events: [] as IEvent[], failed: true };
  }
}
