"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { signIn, signUp } from "@/lib/auth-client";
import { getRedirectPath } from "@/lib/redirect";
import { validateRegister, type Errors } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormField from "@/components/form-field";

export default function SignUp() {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      photoURL: String(formData.get("photoURL") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
    };

    const newErrors = validateRegister(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.photoURL,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    toast.success("Account created successfully. Welcome to SocialBirds!");
    router.push(getRedirectPath());
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({ provider: "google", callbackURL: getRedirectPath() });
  };

  return (
    <div className="flex justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-brand">Create Account</h1>
          <p className="text-sm text-muted-foreground">Register and start making a difference.</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
            <FormField label="Name" htmlFor="name" error={errors.name}>
              <Input id="name" name="name" placeholder="Your name" autoComplete="name" aria-invalid={!!errors.name} />
            </FormField>

            <FormField label="Email" htmlFor="email" error={errors.email}>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
              />
            </FormField>

            <FormField label="Photo URL" htmlFor="photoURL" error={errors.photoURL}>
              <Input
                id="photoURL"
                name="photoURL"
                type="url"
                placeholder="https://example.com/my-photo.jpg"
                aria-invalid={!!errors.photoURL}
              />
            </FormField>

            <FormField
              label="Password"
              htmlFor="password"
              error={errors.password}
              hint="At least 6 characters, with one uppercase and one lowercase letter."
            >
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
              />
            </FormField>

            <Button type="submit" size="lg" className="h-10 w-full" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </Button>

            {/* Divider */}
            <div className="relative my-1 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <span className="relative bg-card px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Or
              </span>
            </div>

            <Button type="button" variant="outline" size="lg" className="h-10 w-full" onClick={handleGoogleSignIn}>
              <FcGoogle className="text-xl" />
              Continue with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/signIn" className="font-semibold text-primary hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <HiOutlineArrowLongLeft className="text-lg" />
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
