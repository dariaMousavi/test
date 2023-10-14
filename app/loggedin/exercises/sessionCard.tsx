'use client';
import { Session } from '@/lib/types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const close = (
  <FontAwesomeIcon icon={faClose} size="2xl" style={{ color: '#2de86b' }} />
);

export default function SessionCard({
  session,
  setDisplayedSessions,
}: {
  session: Session;
  setDisplayedSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}) {
  const [details, setDetails] = useState(false);

  async function handleDelete(id: string) {
    const res: Response = await fetch('/api/exercises', {
      method: 'DELETE',
      headers: {
        'Contet-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await res.json();
    const { deletedItem } = data;
    console.log('DELETED ITEM', deletedItem);
    if (deletedItem.id) {
      setDisplayedSessions((prev: Session[]) => {
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].id === deletedItem.id) {
            prev.splice(i, 1);
          }
        }
        return [...prev];
      });
    } else {
      console.log('ITEM FAILED TO DELETE');
    }
    //TODO: for above, create real alert
  }

  const data = moment(session.createdAt).format('l');

  return (
    <div className="cardBackground">
      <div>
        <div className="flex justify-between items-center text-base font-semibold ">
          <h3 className="font-semibold rounded-lg p-2 px-5 border-2 border-mainGreen shadow-lg">
            {session.time}
          </h3>
          <h3 className="font-semibold">{data}</h3>
          <button
            className="p-3 rounded-lg mt-2 text-base font-bold"
            onClick={() => handleDelete(session.id)}
          >
            {close}
          </button>
        </div>

        <div className="text-lg flex justify-between mt-5 font-bold items-center">
          <p>Total Calories Burned: </p>
          <p>
            {session.caloriesBurned}{' '}
            <span>{session.caloriesBurned > 1 ? 'cals' : 'cal'}</span>
          </p>
        </div>

        {session.activities.map((ex) => (
          <p className="text-base mb-3" key={ex.activity}>
            {ex.activity}
          </p>
        ))}
      </div>
      {details && (
        <ul className="text-base flex flex-col">
          {session.activities.map((activity) => {
            return (
              <>
                <div className="font-semibold  text-mainGreen flex justify-between">
                  <p> {activity.activity} </p>
                  <p> {activity.duration} </p>
                </div>
                <div className="font-semibold flex justify-between">
                  <p> Calories Burned:</p>
                  <p>{activity.calsBurned}</p>
                </div>
              </>
            );
          })}
        </ul>
      )}
      <button
        className="font-semibold text-lg text-mainGreen"
        onClick={() => setDetails(!details)}
      >
        {details ? 'Less Details' : 'Show More Details'}
      </button>
    </div>
  );
}
