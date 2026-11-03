"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";
import { Button } from "@/components/ui/button";

// Sun/moon button that switches between light and dark mode.
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle light and dark theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* CSS decides which icon is visible, so there is no flicker on reload */}
      <FiSun className="hidden dark:block" />
      <FiMoon className="block dark:hidden" />
    </Button>
  );
}
