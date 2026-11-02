'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { getToken } from '@/lib/get-token';
import { IEvent } from './types';
import { Button } from "@/components/ui/button";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_SERVER_URI;

const JoinButton = ({ event }: { event: IEvent }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const userId = session?.user?.id;

  const [joined, setJoined] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isPending) return;               
    if (!userId) {                       
      setLoading(false);
      return;
    }

    const checkJoined = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${BACKEND}/joinedEvents/check/${event._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setJoined(data.joined);
      } catch (error) {
        console.error('Failed to check joined status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkJoined();
  }, [isPending, userId, event._id]);

  const handleClick = async (): Promise<void> => {
    if (!userId) {
      router.push('/signIn');
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const res = joined
        ? await fetch(`${BACKEND}/joinedEvents/${event._id}`, { method: 'DELETE', headers })
        : await fetch(`${BACKEND}/joinedEvents`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ eventId: event._id }),
          });

      if (res.ok) setJoined(!joined);
    } catch (error) {
      console.error('Failed to update event status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      disabled={loading}
      className={`mt-6 w-full text-white ${joined ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-700 hover:bg-emerald-800'}`}
      onClick={handleClick}
    >
      {loading ? 'Loading...' : joined ? 'Joined (click to cancel)' : 'Join'}
    </Button>
  );
};

export default JoinButton;
