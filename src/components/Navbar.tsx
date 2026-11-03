import Link from "next/link";
import { FiCalendar } from "react-icons/fi";
import Logo from "@/components/ui/logo";
import NavBetterAuth from "./NavBetterAuth";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
        {/* Left: logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="hidden text-xl font-bold text-brand sm:inline">SocialBirds</span>
        </Link>

        {/* Middle: upcoming events link */}
        <Link
          href="/events"
          className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium hover:bg-brand-soft hover:text-brand sm:px-4"
        >
          <FiCalendar />
          <span className="hidden sm:inline">Upcoming Events</span>
          <span className="sm:hidden">Events</span>
        </Link>

        {/* Right: theme button + login / profile picture */}
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <NavBetterAuth />
        </div>
      </div>
    </header>
  );
}
