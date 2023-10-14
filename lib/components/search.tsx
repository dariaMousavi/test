'use client';
import { useState } from 'react';
import { FoodData } from '../types';
import { getAutoFillResults, getFoodData } from '@/utils/food-database';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const plus = (
  <FontAwesomeIcon icon={faCirclePlus} size="lg" style={{ color: '#2de86b' }} />
);
const close = <FontAwesomeIcon icon={faClose} size="2xl" />;

export default function SearchPopup({
  setSelectedFoods,
  setModalOpen,
}: {
  setSelectedFoods: Function;
  setModalOpen: Function;
}) {
  const [foods, setFoods] = useState<string[]>([]);
  const [searchDisplay, setSearchDisplay] = useState<FoodData[]>([]);
  const [imageError, setImageError] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const foodsList = await getAutoFillResults(e.target.value);
    setFoods(foodsList);
  }
  async function handleSelect(food: string) {
    const foodsWithData = await getFoodData(food);
    setSearchDisplay(foodsWithData);
  }
  function handleAdd(food: FoodData) {
    setSelectedFoods((prev: FoodData[]) => [...prev, food]);
    setModalOpen(false);
  }

  return (
    <div className="flex flex-col ">
      <div className="bg-mainGreen">
        <form>
          <input
            className="inputLogin"
            type="text"
            name="search"
            placeholder="Search foods..."
            onChange={(e) => handleChange(e)}
          ></input>
        </form>
      </div>

      {foods &&
        foods.map((food, index) => (
          <p
            className="text-base text-center"
            key={index}
            onClick={() => handleSelect(food)}
          >
            {food}
          </p>
        ))}
      {searchDisplay &&
        searchDisplay.map((food) => {
          return (
            <div
              className="bg-mainDarkBlack rounded-lg my-3 max-w-xs p-5 flex flex-col  w-full shadow-lg"
              key={food.foodId}
            >
              <div className="flex justify-between items-center">
                {food.image ? (
                  <Image
                    src={food.image}
                    width={70}
                    height={70}
                    alt={food.label}
                    onError={() => setImageError(true)}
                    className="rounded-full  text-xs self-end"
                    priority={true}
                  />
                ) : (
                  <Image
                    src="/notfound.jpg"
                    width={70}
                    height={70}
                    alt={food.label}
                    onError={() => setImageError(true)}
                    className="rounded-full  text-xs self-end"
                    priority={true}
                  />
                )}

                <h2 className="titleCards text-base ">{food.label}</h2>
              </div>
              <div className="flex items-center ">
                <div className="text-base mt-3">
                  <h3 className="font-semibold">Nutrition Data (Per 100g):</h3>
                  <p>Calories: {food.nutrients.calories}</p>
                  <p>Protein: {food.nutrients.protein}</p>
                  <p>Carbohydrates: {food.nutrients.carbs}</p>
                  <p>Fat: {food.nutrients.fat}</p>
                  <p>Fibre: {food.nutrients.fibre}</p>
                </div>
              </div>
              <button
                className="justify-center"
                onClick={() => handleAdd(food)}
              >
                {plus}
              </button>
            </div>
          );
        })}
    </div>
  );
}
