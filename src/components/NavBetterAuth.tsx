"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiCalendar, FiLogOut, FiPlusCircle, FiSettings, FiUser } from "react-icons/fi";
import { signOut, useSession } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";

// Pages that need a logged in user
const privatePages = ["/newEvent", "/myEvents", "/joinedEvents", "/profile"];

const NavBetterAuth = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    // on a private page we go to login, otherwise to home
    router.push(privatePages.includes(pathname) ? "/signIn" : "/");
  };

  const closeDropdown = () => (document.activeElement as HTMLElement)?.blur();

  if (isPending) {
    return <Skeleton className="h-9 w-24" />;
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signIn" className={buttonVariants({ variant: "ghost", size: "lg" })}>
          Login
        </Link>
        <Link href="/signUp" className={buttonVariants({ size: "lg" })}>
          Register
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="flex items-center gap-2">
      <div className="dropdown dropdown-end">
        {/* Profile picture. Hovering it shows the display name (daisyUI tooltip) */}
        <div className="tooltip tooltip-bottom" data-tip={user.name}>
          <div tabIndex={0} role="button" aria-label="Open profile menu" className="block rounded-full">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name || "User"}
                referrerPolicy="no-referrer"
                className="size-9 rounded-full border object-cover"
              />
            ) : (
              <div className="flex size-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {user.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
          </div>
        </div>

        <ul
          tabIndex={-1}
          onClick={closeDropdown}
          className="dropdown-content menu z-50 mt-2 w-56 rounded-box border bg-base-100 p-2 shadow-lg"
        >
          <li className="menu-title normal-case">
            <span className="block truncate text-sm font-semibold text-base-content">{user.name}</span>
            <span className="block truncate text-xs font-normal">{user.email}</span>
          </li>
          <li><Link href="/profile"><FiUser /> My Profile</Link></li>
          <li><Link href="/newEvent"><FiPlusCircle /> Create Event</Link></li>
          <li><Link href="/myEvents"><FiSettings /> Manage Events</Link></li>
          <li><Link href="/joinedEvents"><FiCalendar /> Joined Events</Link></li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className={buttonVariants({ variant: "outline", size: "lg" })}
      >
        <FiLogOut /> <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
};

export default NavBetterAuth;
