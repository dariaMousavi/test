'use client';
import MealCard from './mealCard';
import { Meal } from '../types';
import { useEffect } from 'react';

export default function MealList({
  displayedMeals,
  setDisplayedMeals,
}: {
  displayedMeals: Meal[];
  setDisplayedMeals: Function;
}) {
  useEffect(() => {
    getMeals().then((res) => setDisplayedMeals(res));
  }, []);

  async function getMeals() {
    const res: Response = await fetch('/api/meals/652560db8f962632ac04d15f');
    const data = await res.json();
    const allMeals = data.allMeals;

    if (Array.isArray(allMeals)) return allMeals;
    else return null;
  }

  return (
    <div>
      {displayedMeals &&
        displayedMeals.map((meal: Meal) => {
          return (
            <MealCard
              key={meal.id}
              mealData={meal}
              setDisplayedMeals={setDisplayedMeals}
            ></MealCard>
          );
        })}
    </div>
  );
}
