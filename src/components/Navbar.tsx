import Link from "next/link";
import { FiCalendar, FiLogIn } from "react-icons/fi";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import NavBetterAuth from "./NavBetterAuth";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Left: logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="hidden text-xl font-bold text-emerald-700 sm:inline">
            SocialBirds
          </span>
        </Link>

        {/* Middle: upcoming events link */}
        <Link
          href="/events"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700"
        >
          <FiCalendar />
          Upcoming events
        </Link>

        {/* Right: static login button (add real login later) */}
        <NavBetterAuth/>
      </div>
    </header>
  );
}








    //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 120" width="200" height="80">
    //     <circle cx="50" cy="50" r="42" fill="#E8F5E9" />
    //     <path d="M35 45 
    //  C30 35, 40 25, 55 30 
    //  C70 20, 80 35, 75 50 
    //  C80 60, 70 70, 55 65 
    //  C40 70, 30 60, 35 45 Z" fill="#2E7D32" />
    //     <path d="M50 40 
    //  C60 30, 75 35, 70 50 
    //  C65 45, 55 45, 50 40 Z" fill="#4CAF50" />
    //     <circle cx="70" cy="38" r="10" fill="#2E7D32" />
    //     <path d="M78 38 L88 40 L78 42 Z" fill="#FF9800" />
    //     <circle cx="73" cy="36" r="2.5" fill="#FFFFFF" />
    //     <circle cx="73.5" cy="35.5" r="1" fill="#1B5E20" />
    //     <path d="M42 60 
    //  C35 55, 30 45, 38 40 
    //  C45 45, 48 55, 42 60 Z" fill="#81C784" />
    //     <path d="M40 50 Q42 45 44 50" stroke="#2E7D32" stroke-width="1.2" fill="none" />

    //     <text x="110" y="50" font-family="Segoe UI, Arial, sans-serif" font-size="80" font-weight="700" fill="#1B5E20" dominant-baseline="central">
    //       SocialBirds
    //     </text>
    //   </svg>
