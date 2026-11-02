'use client'
import { useSession } from '@/lib/auth-client';
import React, { useState } from 'react';
import { IEvent } from './types';
import { Button } from "@/components/ui/button";

const JoinButton = ({ event }: { event: IEvent }) => {
  const { data: session } = useSession();
  const [joined, setJoined] = useState<boolean>(false);
  const joinedEvent = { ...event, email: session?.user.email };

  const handleJoin = async (): Promise<void> => {
    try {
      const url = joined ? `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URI}/joinedEvents/${event._id}` : `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URI}/joinedEvents`;
      const res = await fetch(url, {
        method: joined ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(joinedEvent)
      });

      if (res.ok) {
        // Toggle state ONLY when the API request succeeds
        setJoined(!joined);
      }
    } catch (error) {
      console.error('Failed to update event status:', error);
    }
  };

  return (
    <Button
      size="lg"
      className={`mt-6 w-full text-white ${joined ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-700 hover:bg-emerald-800'
        }`}
      onClick={handleJoin}
    >
      {joined ? 'Joined (click to cancel)' : 'Join'}
    </Button>
  );
};

export default JoinButton;