import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-3xl font-bold text-brand">We could not find that page</h1>
      <p className="mt-2 text-muted-foreground">
        The page or event you are looking for may have been removed or never existed.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className={buttonVariants({ size: "lg", className: "h-10" })}>
          Go home
        </Link>
        <Link href="/events" className={buttonVariants({ variant: "outline", size: "lg", className: "h-10" })}>
          See events
        </Link>
      </div>
    </div>
  );
}
