import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter, FaGithub } from "react-icons/fa6";
import { FiMail, FiMapPin } from "react-icons/fi";
import Logo from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer className="mt-24 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        {/* About */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold text-white">SocialBirds</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed">
            A home for neighbors who want to do something good together. Create an
            event, find people to help, and see what changed.
          </p>
          <div className="mt-5 flex gap-3 text-lg">
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-amber-400 hover:text-slate-900"><FaFacebookF /></a>
            <a href="#" aria-label="X" className="rounded-full bg-white/10 p-2 hover:bg-amber-400 hover:text-slate-900"><FaXTwitter /></a>
            <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-amber-400 hover:text-slate-900"><FaInstagram /></a>
            <a href="#" aria-label="GitHub" className="rounded-full bg-white/10 p-2 hover:bg-amber-400 hover:text-slate-900"><FaGithub /></a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold text-white">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/events" className="hover:text-white">All events</Link></li>
            <li><Link href="/events/new" className="hover:text-white">Create an event</Link></li>
            <li><Link href="/#features" className="hover:text-white">How it works</Link></li>
            <li><Link href="/#stories" className="hover:text-white">Visual stories</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2"><FiMail /> hello@socialbirds.org</li>
            <li className="flex items-center gap-2"><FiMapPin /> Rangpur, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs sm:flex-row">
          <p>&copy; 2026 SocialBirds. Built by volunteers.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Volunteer guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
