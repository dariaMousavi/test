'use client';
import { CleanActivityData, Session } from '@/lib/types';
import { useState, useEffect } from 'react';
import { FormEvent, FormEventHandler } from 'react';
import {
  getAutoFillSuggestions,
  getActivityDetails,
  getActivitiesList,
} from '@/utils/exercise-database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const plus = (
  <FontAwesomeIcon icon={faCirclePlus} size="lg" style={{ color: '#2de86b' }} />
);

export default function SearchExercise({
  setSelectedActivities,
  setModalOpen,
}: {
  setSelectedActivities: React.Dispatch<
    React.SetStateAction<CleanActivityData[]>
  >;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [allActivities, setAllActivities] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [searchDisplay, setSearchDisplay] = useState<CleanActivityData[]>([]);

  useEffect(() => {
    getAllActivities();
  }, []);

  async function getAllActivities() {
    const list = (await getActivitiesList()) as string[];

    setAllActivities(list);
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const activitiesList = getAutoFillSuggestions(
      e.target.value,
      allActivities
    );

    setOptions(activitiesList);
  }
  async function handleSelect(activity: string) {
    const activityData = await getActivityDetails(activity, 160); //TODO REDUX FOR USER WEIGHT
    console.log('SELECT', activityData);
    setSearchDisplay(activityData);
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOptions([]);
    const activityData = await getActivityDetails(e.currentTarget.value, 160); //TODO REDUX FOR USER WEIGHT
    setSearchDisplay(activityData);
  }
  function handleAdd(food: CleanActivityData) {
    setSelectedActivities((prev: CleanActivityData[]) => [...prev, food]);
    setModalOpen(false);
  }

  return (
    <div className="flex flex-col">
      <div>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            name="search"
            className="inputLogin"
            placeholder="Search exercises..."
            onChange={(e) => handleChange(e)}
          ></input>
          <button
            className="bg-lightGreen text-mainBlack font-semibold rounded-md text-base p-2 px-7"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      {/* TODO: FIX THE SEARCH OPTION */}
      {/* {options && options.map(option => <p onClick={()=> handleSelect(option)}>{option}</p>)} */}

      {searchDisplay &&
        searchDisplay.map((activity, index) => {
          return (
            <div className="cardsSearch" key={index}>
              <div className="flex flex-1 justify-between  gap-2">
                <h2 className="font-bold text-base ">{activity.activity}</h2>
                <div className="flex flex-auto  flex-col w-2/4">
                  <h3 className="text-base font-semibold">
                    {activity.caloriesPerHour}
                  </h3>
                  <p className="text-base">KCAL P/hour</p>
                </div>
              </div>
              <button
                className="justify-center mt-5"
                onClick={() => handleAdd(activity)}
              >
                {plus}
              </button>
            </div>
          );
        })}
    </div>
  );
}
