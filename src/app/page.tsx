import Link from "next/link";
import {
  FiCalendar, FiCheckCircle, FiCompass, FiEdit3, FiGlobe, FiHeart,
  FiMapPin, FiMousePointer, FiPlus, FiSettings, FiTrendingUp, FiUsers, FiBell,
} from "react-icons/fi";
import EventCard from "@/components/event-card";
import NewsletterForm from "@/components/newsletter-form";
import { buttonVariants } from "@/components/ui/button";
import { fetchUpcomingEvents } from "@/lib/api";

// Static content for the stats, features and gallery sections
const stats = [
  { icon: FiUsers, value: "12,500+", label: "Active members" },
  { icon: FiCheckCircle, value: "1,840", label: "Events completed" },
  { icon: FiHeart, value: "96,000+", label: "Lives impacted" },
  { icon: FiGlobe, value: "100%", label: "Community driven" },
];

const features = [
  { icon: FiMousePointer, title: "One-click participation", text: "Join any event with a single tap. No forms, no phone calls." },
  { icon: FiCalendar, title: "Upcoming-only discovery", text: "See only what is still ahead, sorted by the nearest date." },
  { icon: FiMapPin, title: "Find help close to home", text: "Search by neighborhood so you can walk or ride to the event." },
  { icon: FiEdit3, title: "Create in minutes", text: "Add a title, place, date and photo, and your event is live." },
  { icon: FiTrendingUp, title: "Track your impact", text: "Keep a record of the events you joined and the people you reached." },
  { icon: FiSettings, title: "Manage your events", text: "Edit the details or delete your event any time from one page." },
];

const stories = [
  { title: "1,200 blankets for the first cold week", location: "Rangpur Sadar", date: "Jan 14, 2026", image: "https://picsum.photos/seed/story1/800/600" },
  { title: "3,000 saplings along the river", location: "Ghaghat Riverbank", date: "Jul 6, 2026", image: "https://picsum.photos/seed/story2/800/600" },
  { title: "A kitchen that fed 400 families", location: "Station Road", date: "Mar 22, 2026", image: "https://picsum.photos/seed/story3/800/600" },
  { title: "Eight new homes after the floods", location: "Kurigram", date: "Sep 2, 2026", image: "https://picsum.photos/seed/story4/800/600" },
  { title: "Students stand up against bribery", location: "Carmichael College", date: "May 18, 2026", image: "https://picsum.photos/seed/story5/800/600" },
  { title: "A cleaner canal in one morning", location: "Dhap Canal", date: "Aug 9, 2026", image: "https://picsum.photos/seed/story6/800/600" },
];

export default async function HomePage() {
  // The server sorts by date and sends only the 6 nearest upcoming events (MongoDB .limit(6))
  const { events: upcomingEvents, failed } = await fetchUpcomingEvents(6);

  return (
    <>
      {/* 1. Hero / banner */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-15 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-brand sm:text-6xl">
            Small acts, done together, change a whole neighborhood.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Join a blanket drive, plant a tree, serve a meal or build a home.
            Find the next event, or start your own and invite your community.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className={buttonVariants({ size: "lg", className: "h-11 px-5 text-base" })}>
              <FiCompass /> Explore all events
            </Link>
            <Link href="/newEvent" className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 px-5 text-base" })}>
              <FiPlus /> Create new event
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((n) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={n}
              src={`https://picsum.photos/seed/hero${n}/500/500`}
              alt="Community event photo"
              className={`aspect-square w-full rounded-3xl bg-muted object-cover ${n % 2 === 0 ? "mt-8" : ""}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Stats */}
      <section className="bg-emerald-800 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col gap-2">
              <Icon className="text-2xl text-amber-400" />
              <p className="text-4xl font-extrabold">{value}</p>
              <p className="text-sm text-emerald-100">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Platform features */}
      <section id="features" className="mx-auto max-w-6xl px-4 pt-24">
        <h2 className="text-3xl font-bold text-brand sm:text-4xl">Everything you need to show up and help</h2>
        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-xl text-brand">
                <Icon />
              </span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Recent upcoming events (6 in a grid, from the database) */}
      <section className="mx-auto max-w-6xl px-4 pt-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold text-brand sm:text-4xl">Recent upcoming events</h2>
          <Link href="/events" className="shrink-0 text-sm font-semibold text-primary hover:underline">
            See all events
          </Link>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border bg-card p-10 text-center text-muted-foreground">
            {failed
              ? "We could not load the events right now. Please refresh the page in a moment."
              : "No upcoming events yet. Be the first to create one!"}
          </div>
        )}
      </section>

      {/* 5. Gallery (static photos) */}
      <section id="stories" className="mx-auto max-w-6xl px-4 pt-24">
        <h2 className="text-3xl font-bold text-brand sm:text-4xl">What your neighbors have already done</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <figure key={story.title} className="overflow-hidden rounded-2xl border bg-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={story.image} alt={story.title} className="aspect-[4/3] w-full bg-muted object-cover" />
              <figcaption className="p-4">
                <p className="font-semibold">{story.title}</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <FiMapPin className="text-primary" /> {story.location}
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <FiCalendar className="text-primary" /> {story.date}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 6. Newsletter */}
      <section className="mx-auto max-w-6xl px-4 pt-24">
        <div className="rounded-3xl bg-amber-400 px-6 py-12 text-center text-slate-900 sm:px-12">
          <FiBell className="mx-auto text-3xl" />
          <h2 className="mt-3 text-3xl font-bold">Subscribe to local alerts</h2>
          <p className="mt-2">One short email when someone plans an event near you.</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
