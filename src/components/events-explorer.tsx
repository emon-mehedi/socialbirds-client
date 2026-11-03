"use client"; // needed because this file uses useState (typing, clicking)

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import EventCard from "./event-card";
import MyEventCard from "./my-event-card";
import { IEvent } from "./types";
import { categories } from "./categories";

// Search box + category pills + grid of cards.
//  - manage = true  -> shows cards with Edit / Delete buttons (Manage Events page)
export default function EventsExplorer({
  events = [],
  manage = false,
  emptyMessage = "No events found.",
}: {
  events?: IEvent[];
  manage?: boolean;
  emptyMessage?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  // Keep only the events that match the chosen pill and the search text
  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch = (event.title + " " + event.location)
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by title or place"
          className="h-10 bg-card pl-9"
        />
      </div>

      {/* Horizontal pill bar */}
      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium ${
              selectedCategory === category
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card hover:border-primary hover:text-primary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid of events */}
      {filteredEvents.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">{emptyMessage}</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) =>
            manage ? (
              <MyEventCard key={event._id} event={event} />
            ) : (
              <EventCard key={event._id} event={event} />
            )
          )}
        </div>
      )}
    </div>
  );
}
