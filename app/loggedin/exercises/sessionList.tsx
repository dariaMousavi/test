'use client';
import { Session } from '@/lib/types';
import { useEffect, useState } from 'react';
import SessionCard from './sessionCard';

export default function SessionList({
  displayedSessions,
  setDisplayedSessions,
}: {
  displayedSessions: Session[];
  setDisplayedSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}) {
  useEffect(() => {
    getAllSessions();
  }, []);

  async function getAllSessions() {
    const res: Response = await fetch(
      '/api/exercises/652560db8f962632ac04d15f'
    );
    const data = await res.json();
    const allSession = data.allSession as Session[];
    console.log('ALL SESSIONS LIST', allSession);
    if (Array.isArray(allSession)) {
      setDisplayedSessions(allSession);
    } else return null;
  }
  return (
    <div>
      {displayedSessions &&
        displayedSessions.map((session: Session) => {
          return (
            <SessionCard
              key={session.id}
              session={session}
              setDisplayedSessions={setDisplayedSessions}
            />
          );
        })}
    </div>
  );
}
