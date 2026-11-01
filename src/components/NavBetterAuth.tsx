'use client'
import { signOut, useSession } from '@/lib/auth-client';
import { Spinner } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ImUser } from 'react-icons/im';
import { PiArrowBendDownLeft } from 'react-icons/pi';

const NavBetterAuth = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <Spinner size='xl' />
        <span className='text-xs text-muted'>Loading...</span>
      </div>
    )
  }

  return (
    <>
      {
        session?.user
          ? <div className='flex flex-row gap-2 items-center'>


            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                                     {/* Avatar */}
                {session.user.image 
                  ? <Image src={session.user.image} alt={session.user.name || "User"} width={8} height={8} className="w-8 h-8 rounded-xl object-cover"/>
                  : <div className="w-8 h-8 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold">
                      {session.user.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                }
                <span>{session.user.name}</span>
                ▼</div>
              <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-4 shadow-sm">
                <li>{session.user.name}<br></br>{session.user.email}</li>
                <li className='hover:bg-base-200' onClick={() => (document.activeElement as HTMLElement)?.blur()}><Link href={'/profile'}><ImUser /><span>My Profile</span></Link></li>
                <li className='hover:bg-base-200' onClick={() => (document.activeElement as HTMLElement)?.blur()}><Link href={'/newEvent'}><ImUser /><span>Create Event</span></Link></li>
                <li className='hover:bg-base-200' onClick={() => (document.activeElement as HTMLElement)?.blur()}><Link href={'/myEvents'}><ImUser /><span>Manage Events</span></Link></li>
                <li className='hover:bg-base-200' onClick={() => (document.activeElement as HTMLElement)?.blur()}><Link href={'/joinedEvents'}><ImUser /><span>Joined Events</span></Link></li>
                <li className='hover:bg-base-200 text-red-600' onClick={() => (document.activeElement as HTMLElement)?.blur()}><Link href={'/signIn'} onClick={() => signOut()}><PiArrowBendDownLeft /> <span>Sign Out</span></Link></li>
              </ul>
            </div>

          </div>
          : <div className="flex flex-row gap-2 justify-center items-center">
            <Link href={'/signIn'}><button>Sign In</button></Link>
            <Link href={'/signUp'}><button className='btn btn-sm bg-emerald-700 text-white'>Sign Up</button></Link>
          </div>

      }
    </>
  );
};

export default NavBetterAuth;