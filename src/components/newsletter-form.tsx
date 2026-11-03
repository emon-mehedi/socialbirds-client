"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Newsletter box on the home page. (No real emails are sent - it only shows a toast.)
export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className="h-11 border-transparent bg-white text-slate-900 placeholder:text-slate-500 dark:bg-white"
      />
      <Button type="submit" className="h-11 bg-slate-900 px-5 text-white hover:bg-slate-800">
        Subscribe
      </Button>
    </form>
  );
}
