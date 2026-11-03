"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiLogOut } from "react-icons/fi";
import FormField from "@/components/form-field";
import PrivateRoute from "@/components/PrivateRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut, updateUser, useSession } from "@/lib/auth-client";
import { validateProfile, type Errors } from "@/lib/validation";

function ProfileContent() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = {
      name: String(formData.get("name") ?? "").trim(),
      photoURL: String(formData.get("photoURL") ?? "").trim(),
    };

    const newErrors = validateProfile(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
      return;
    }

    setLoading(true);
    const { error } = await updateUser({
      name: values.name,
      ...(values.photoURL ? { image: values.photoURL } : {}),
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Could not update your profile");
      return;
    }
    toast.success("Profile updated successfully");
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/signIn");
  };

  if (!user) return null;

  return (
    <div className="flex justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-brand">My Profile</h1>
          <p className="text-sm text-muted-foreground">See and update your info here</p>
        </div>

        {/* User info card */}
        <div className="flex items-center justify-between gap-4 rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3 overflow-hidden">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name || "User"}
                referrerPolicy="no-referrer"
                className="size-12 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-lg font-bold text-brand">
                {user.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <div className="overflow-hidden">
              <h2 className="truncate text-lg font-semibold">{user.name}</h2>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Button variant="destructive" size="lg" className="h-9 shrink-0" onClick={handleLogout}>
            <FiLogOut /> Logout
          </Button>
        </div>

        {/* Update form */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
            <h3 className="text-base font-semibold">Update profile info</h3>

            <FormField label="Name" htmlFor="name" error={errors.name}>
              <Input id="name" name="name" defaultValue={user.name} placeholder="Your name" aria-invalid={!!errors.name} />
            </FormField>

            <FormField
              label="Photo URL"
              htmlFor="photoURL"
              error={errors.photoURL}
              hint="Paste a link to your new profile picture."
            >
              <Input
                id="photoURL"
                name="photoURL"
                type="url"
                defaultValue={user.image ?? ""}
                placeholder="https://example.com/my-photo.jpg"
                aria-invalid={!!errors.photoURL}
              />
            </FormField>

            <Button type="submit" size="lg" className="h-10 w-full" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfileContent />
    </PrivateRoute>
  );
}
