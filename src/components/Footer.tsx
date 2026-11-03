import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter, FaGithub } from "react-icons/fa6";
import { FiMail, FiMapPin } from "react-icons/fi";
import Logo from "@/components/ui/logo";

const socials = [
  { name: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { name: "X", href: "https://x.com", icon: FaXTwitter },
  { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { name: "GitHub", href: "https://github.com", icon: FaGithub },
];

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
            {socials.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="rounded-full bg-white/10 p-2 hover:bg-amber-400 hover:text-slate-900"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold text-white">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/events" className="hover:text-white">Upcoming events</Link></li>
            <li><Link href="/newEvent" className="hover:text-white">Create an event</Link></li>
            <li><Link href="/joinedEvents" className="hover:text-white">Joined events</Link></li>
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
          <p>Small acts, done together.</p>
        </div>
      </div>
    </footer>
  );
}
