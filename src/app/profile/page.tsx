'use client';

import { signOut, updateUser, useSession } from '@/lib/auth-client';
import { Button, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PiArrowBendDownLeft } from 'react-icons/pi';

const Profile = () => {
  const { data: session } = useSession();
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
     await updateUser({
      name: data.name
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-slate-50/50">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            My Profile
          </h1>
          <p className="text-sm text-slate-500">See and manage your info here</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-row justify-between items-center gap-4">
          <div className="flex flex-row items-center gap-3 overflow-hidden">
            {session?.user.image ? (
              <Image 
                src={session.user.image} 
                alt={session.user.name || "User"} 
                width={48} 
                height={48} 
                className="w-12 h-12 rounded-xl object-cover shrink-0" 
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg shrink-0">
                {session?.user.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <div className="overflow-hidden">
              <h2 className="text-lg font-semibold text-slate-800 truncate">
                {session?.user.name}
              </h2>
              <p className="text-xs text-slate-400 truncate">
                {session?.user.email}
              </p>
            </div>
          </div>
          
          <Link 
            href={'/signIn'} 
            onClick={() => { signOut(); }} 
            className="text-red-600 border border-red-200 hover:bg-red-50 rounded-xl px-3 py-2 flex flex-row items-center gap-1.5 text-sm font-medium transition-colors shrink-0"
          >
            <PiArrowBendDownLeft className="text-base" /> 
            <span>Sign Out</span>
          </Link>
        </div>

        {/* Update Form Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h3 className="text-base font-semibold text-slate-800">Update Profile Info</h3>
            
            <div className="w-full flex flex-col">
              <TextField isRequired name="name" className="w-full">
                <Label className="text-sm font-medium text-slate-700">Name</Label>
                <Input className="w-full mt-1" placeholder="Your name" />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 transition-colors"
            >
              Update
            </Button>
          </Form>
        </div>

      </div>
    </div>
  );
};

export default Profile;