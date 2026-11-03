"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

// shadcn toast. Put <Toaster /> once in layout.tsx, then anywhere call:
//   import { toast } from "sonner";
//   toast.success("Saved!")   toast.error("Something went wrong")
const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={(resolvedTheme as ToasterProps["theme"]) ?? "light"}
      richColors
      closeButton
      position="top-center"
      {...props}
    />
  );
};

export { Toaster };
