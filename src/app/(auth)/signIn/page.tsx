"use client";

import { signIn } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

export default function SignIn() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    console.log("data before submitting", data);
    const { data: resData, error } = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });
    if (resData) {
      console.log(resData);
    }
    if (error) {
      console.log(error);
    } else {
      console.log("signed in Successfully");
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-slate-50/50">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Sign In
          </h2>
          <p className="text-sm text-slate-500">And get the full experience</p>
        </div>

        {/* Card Container */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
          <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
            
            {/* Email Field (Separate Line) */}
            <div className="w-full flex flex-col">
              <TextField
                isRequired
                name="email"
                type="email"
                className="w-full"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-slate-700">Email</Label>
                <Input placeholder="john@example.com" className="w-full mt-1" />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>

            {/* Password Field (Separate Line) */}
            <div className="w-full flex flex-col">
              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                className="w-full"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-slate-700">Password</Label>
                <Input placeholder="at least 8 character" className="w-full mt-1" />
                <Description className="text-xs text-slate-400 mt-1">
                  At least 8 characters, with 1 uppercase letter and 1 number.
                </Description>
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 transition-colors"
            >
              Sign In
            </Button>

            {/* Divider */}
            <div className="relative my-2 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                Or
              </span>
            </div>

            {/* Google Sign In (Full Width Line) */}
            <div className="w-full">
              <Button
                type="button"
                onClick={() => handleGoogleSignIn()}
                className="w-full rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 font-medium py-2.5 flex items-center justify-center gap-2 transition-colors"
              >
                <FcGoogle className="text-xl" />
                <span>Continue with Google</span>
              </Button>
            </div>

            <div className="text-center text-sm text-slate-600 mt-2">
              No account?{" "}
              <Link href={"/signUp"} className="font-semibold text-emerald-600 hover:underline">
                Sign Up Now
              </Link>
            </div>
          </Form>
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <Link
            href={"/"}
            className="inline-flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <HiOutlineArrowLongLeft className="text-lg" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}