'use client'
import { useSession } from '@/lib/auth-client';
import React from 'react';
import { IEvent } from './types';
import { Button } from "@/components/ui/button";

const JoinButton = ({event}:{event:IEvent}) => {
  const {data:session}= useSession();
  const handleJoin= async()=>{
    const joinedEvent ={...event, email:session?.user.email}

    const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URI}/joinedEvents`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(joinedEvent)
    });
    console.log(res);
  }
  return (
    <Button size="lg" className="mt-6 w-full bg-emerald-700 text-white hover:bg-emerald-800" onClick={handleJoin}>
      Join
    </Button>
  );
};

export default JoinButton;