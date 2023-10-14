'use client';
import { Meal } from '../types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const close = (
  <FontAwesomeIcon icon={faClose} size="2xl" style={{ color: '#2de86b' }} />
);

export default function MealCard({
  mealData,
  setDisplayedMeals,
}: {
  mealData: Meal;
  setDisplayedMeals: Function;
}) {
  const [details, setDetails] = useState(false);

  async function handleDelete(id: string) {
    const res: Response = await fetch('/api/meals', {
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
      setDisplayedMeals((prev: Meal[]) => {
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

  return (
    <div className="cardBackground">
      <div className="">
        <div className="flex justify-between items-center text-base font-semibold ">
          <h3 className="font-semibold rounded-lg p-2 px-5 border-2 border-mainGreen shadow-lg">
            {mealData.type}
          </h3>
          {/* TODO: Make real time */}
          <p className="">11/10/2023</p>
        </div>

        <div className="text-lg flex justify-between mt-5 font-bold items-center">
          <p>Total Calories: </p>
          <p>
            {mealData.totalCals}{' '}
            <span>{mealData.totalCals > 1 ? 'cals' : 'cal'}</span>
          </p>
          <button
            className="p-3  rounded-lg mt-2 text-base   font-bold"
            onClick={() => handleDelete(mealData.id)}
          >
            {close}
          </button>
        </div>

        {mealData.ingredients.map((ing) => (
          <p className="text-base mb-5" key={ing.name}>
            {ing.name}
          </p>
        ))}
      </div>

      {details && (
        <ul className="text-base flex flex-col">
          {mealData.ingredients.map((ingredient) => {
            return (
              <>
                <div className="font-semibold  text-mainGreen flex justify-between">
                  <p className=""> {ingredient.name}</p>
                  <p> {ingredient.amount + ' grams'} </p>
                </div>

                <div className="font-semibold flex justify-between">
                  <p> Calories:</p>
                  <p>
                    {' '}
                    {(
                      ingredient.nutrients.calories *
                      (ingredient.amount / 100)
                    ).toFixed(2)}
                  </p>
                </div>

                <div className="font-semibold flex justify-between">
                  <p> Protein:</p>
                  <p>
                    {' '}
                    {(
                      ingredient.nutrients.protein *
                      (ingredient.amount / 100)
                    ).toFixed(2)}
                  </p>
                </div>

                <div className="font-semibold flex justify-between">
                  <p> Carbohydrates:</p>
                  <p>
                    {' '}
                    {(
                      ingredient.nutrients.carbs *
                      (ingredient.amount / 100)
                    ).toFixed(2)}
                  </p>
                </div>

                <div className="font-semibold flex justify-between">
                  <p> Fibre:</p>
                  <p>
                    {' '}
                    {(
                      ingredient.nutrients.fibre *
                      (ingredient.amount / 100)
                    ).toFixed(2)}
                  </p>
                </div>

                <div className="font-semibold flex justify-between">
                  <p> Fat:</p>
                  <p>
                    {' '}
                    {(
                      ingredient.nutrients.fat *
                      (ingredient.amount / 100)
                    ).toFixed(2)}
                  </p>
                </div>
              </>
            );
          })}
        </ul>
      )}
      {!details ? (
        <button
          className="font-semibold text-lg text-mainGreen"
          onClick={() => setDetails(!details)}
        >
          Show More
        </button>
      ) : (
        <button
          className="mt-2 font-semibold text-lg text-mainGreen"
          onClick={() => setDetails(!details)}
        >
          Show Less
        </button>
      )}
    </div>
  );
}
