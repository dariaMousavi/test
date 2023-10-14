'use client';
import { useState, FormEvent } from 'react';
import { CleanActivityData, NewSessionList, Session } from '@/lib/types';
import SessionEntry from './sessionEntry';

export default function ExerciseSession({
  setModalOpen,
  setAddSessionBox,
  setDisplayedSessions,
  selectedActivities,
  setSelectedActivities,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddSessionBox: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayedSessions: React.Dispatch<React.SetStateAction<Session[]>>;
  selectedActivities: CleanActivityData[];
  setSelectedActivities: React.Dispatch<
    React.SetStateAction<CleanActivityData[]>
  >;
}) {
  const [time, setTime] = useState('Morning');

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    let activityNamesAndDurations: any = {};
    const formElement = e.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);
    for (const pair of formData.entries()) {
      activityNamesAndDurations[pair[0]] = pair[1];
    }

    let calsBurnedThisSesssion = 0;
    let activityList: NewSessionList[] = [];
    delete activityNamesAndDurations['Exercise-type'];

    for (const activityName in activityNamesAndDurations) {
      for (let i = 0; i < selectedActivities.length; i++) {
        if (activityName === selectedActivities[i].activity) {
          let duration: number = activityNamesAndDurations[activityName];
          calsBurnedThisSesssion +=
            selectedActivities[i].caloriesPerHour * (duration / 60);
          activityList.push({
            activity: activityName,
            calsBurned: selectedActivities[i].caloriesPerHour * (duration / 60),
            duration: duration,
          });
        }
      }
    }
    const response = await fetch('/api/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activities: activityList,
        caloriesBurned: calsBurnedThisSesssion,
        time: time,
        userId: '652560db8f962632ac04d15f', //TODO REDUX FOR USER ID
      }),
    });
    const { newSession } = await response.json();

    setDisplayedSessions((prev) => [...prev, newSession]);
    setAddSessionBox(false);
  }
  return (
    <div className="mx-4">
      <form onSubmit={submitHandler}>
        {selectedActivities.map((activity: CleanActivityData, i: number) => (
          <SessionEntry
            key={i}
            setSelectedActivities={setSelectedActivities}
            activity={activity}
          />
        ))}

        <button
          className="inputLogin text-center mt-5"
          type="button"
          onClick={() => setModalOpen(true)}
        >
          Add New Exercise 💪
        </button>

        <div className="flex justify-around mt-5 gap-4">
          <div className="flex-1">
            <select
              className="buttonSelect w-full"
              name="Exercise-type"
              defaultValue={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="Early-morning">Early Morning</option>
              <option value="Late-morning">Late Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>

          <div className="flex-1">
            <button className={`buttonConfirm w-full`} type="submit">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
