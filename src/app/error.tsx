"use client";

import { Button } from "@/components/ui/button";

// Shown when a page crashes (for example the server is not reachable)
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-brand">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">We could not load this page. Please try again.</p>
      <Button size="lg" className="mt-8 h-10" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
