"use client"; // needed because this file uses useState (typing, clicking)

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import EventCard from "./event-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IEvent } from "./types";
import { categories } from "./categories";


export default function EventsExplorer({ events }: { events: IEvent[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  // Keep only the events that match the chosen pill and the search text
  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch = (event.title + event.location)
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search */}
      <div className="flex gap-2">
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by title or place"
          className="bg-white"
        />
        <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
          <FiSearch /> Search
        </Button>
      </div>

      {/* Horizontal pill bar */}
      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium ${
              selectedCategory === category
                ? "border-emerald-700 bg-emerald-700 text-white"
                : "bg-white hover:border-emerald-700 hover:text-emerald-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid of events */}
      {filteredEvents.length === 0 ? (
        <p className="mt-12 text-center text-slate-500">No events found.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
