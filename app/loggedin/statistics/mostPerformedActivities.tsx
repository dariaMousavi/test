'use client';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/lib/store/store';
import { mostPerformedActivities } from './utils/statSettersExercise';

export default function AverageBurnedCalories() {
  const userData = useUserStore.getState().data;
  const [activities, setActivities] = useState<string[]>([]);
  // const [displayCount, setDisplayCount] = useState(5)

  useEffect(() => {
    if (userData) {
      const exerciseHistory = userData.exerciseHistory;
      const list = mostPerformedActivities(exerciseHistory, 5);
      setActivities(list);
    }
  }, [userData]);

  return (
    <div className="flex flex-col gap-2">
      <h6 className="mx-6 text-lg ">Your favourite activities!</h6>
      {activities &&
        activities.map((activity, index) => {
          return (
            <div key={index} className={`cardBackground my-0`}>
              <p className="font-semibold">{activity} Kcal</p>
            </div>
          );
        })}
    </div>
  );
}
