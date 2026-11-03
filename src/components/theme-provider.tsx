"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

// Wraps the app so every page knows if the theme is light or dark.
// It sets BOTH:  class="dark"  (for shadcn)  and  data-theme="dark"  (for daisyUI)
export default function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
