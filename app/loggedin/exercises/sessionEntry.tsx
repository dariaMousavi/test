'use client';
import { useState } from 'react';
import { CleanActivityData } from '@/lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const close = (
  <FontAwesomeIcon icon={faClose} size="2xl" style={{ color: '#2de86b' }} />
);

export default function SessionEntry({
  activity,
  setSelectedActivities,
}: {
  activity: CleanActivityData;
  setSelectedActivities: Function;
}) {
  const [duration, setDuration] = useState(60);

  function handleClose(activity: CleanActivityData) {
    setSelectedActivities((prev: CleanActivityData[]) => {
      for (let i = 0; i < prev.length; i++) {
        if (prev[i].activity === activity.activity) {
          prev.splice(i, 1);
        }
      }
      return [...prev];
    });
  }

  return (
    <div className="text-base cardBackground flex flex-col">
      <div className="text-lg font-bold text-mainGreen">
        {activity.activity}:
      </div>
      <label className="mt-4 font-semibold">Insert how many Minutes</label>
      <input
        className="inputLogin"
        name={activity.activity}
        type="number"
        onChange={(e) => setDuration(Number(e.target.value))}
        placeholder="Minutes"
      ></input>{' '}
      <div>
        <h3>
          Calories Burned:{' '}
          {(activity.caloriesPerHour * (duration / 60)).toFixed(2)}
        </h3>
      </div>
      <button type="button" onClick={() => handleClose(activity)}>
        {close}
      </button>
    </div>
  );
}
