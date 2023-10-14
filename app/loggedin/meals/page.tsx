'use client';
import { useState } from 'react';
import Modal from '../../modal/Modal';
import MealList from '@/lib/components/mealList';
import AddMeal from '@/lib/components/addMeal';
import SearchPopup from '@/lib/components/search';
import { FoodData, Meal } from '@/lib/types';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const back = (
  <FontAwesomeIcon
    icon={faAngleDoubleLeft}
    size="2xl"
    style={{ color: '#2de86b' }}
  />
);

export default function MealsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [addMealBox, setAddMealBox] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<FoodData[]>([]);
  const [displayedMeals, setDisplayedMeals] = useState<Meal[]>([]);

  return (
    <div className="sectionMainPages ">
      <section className="h-20 flex justify-between items-center  mx-5 mt-10">
        <button onClick={() => setAddMealBox(!addMealBox)}>{back}</button>
        <h4 className="font-bold">My Meals</h4>
        <Link href="/loggedin/profile">
          <Image
            src="/profile.jpg"
            alt="Pandar bear profile"
            width={50}
            height={50}
            className="item-center text-mainWhite rounded-full border-2 border-mainGreen"
          />
        </Link>
      </section>

      {!addMealBox ? (
        <button
          className={`rounded-xl p-3 border-2 border-lightGreen mt-5  font-bold text-base w-[350px]  shadow-lg bg-lightGreen text-mainBlack self-center mb-5`}
          onClick={() => setAddMealBox(!addMealBox)}
        >
          {'Add new meal'}
        </button>
      ) : (
        <button className="hidden"></button>
      )}

      {addMealBox && (
        <AddMeal
          setSelectedFoods={setSelectedFoods}
          setDisplayedMeals={setDisplayedMeals}
          setModalOpen={setModalOpen}
          selectedFoods={selectedFoods}
          setAddMealBox={setAddMealBox}
        />
      )}

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <SearchPopup
          setModalOpen={setModalOpen}
          setSelectedFoods={setSelectedFoods}
        ></SearchPopup>
      </Modal>

      <div className={!addMealBox ? `block` : 'hidden'}>
        {displayedMeals && (
          <MealList
            displayedMeals={displayedMeals}
            setDisplayedMeals={setDisplayedMeals}
          />
        )}
      </div>

      <section
        className={
          !addMealBox
            ? `cardBgPhoto flex flex-col h-28 bg-cover relative mt-3 cursor-pointer`
            : 'hidden'
        }
      >
        <div>
          <Image
            src="/images/healthfood.jpg"
            alt="Some plates of healthy food in it"
            fill={true}
            style={{ objectFit: 'cover' }}
            className="absolute rounded-lg  opacity-40"
            priority={true}
          />
        </div>
        <div className="z-10 flex flex-col  ">
          <p className="text-lg font-bold">Ask for health ideas </p>
          <p className="text-lg font-bold">with our AI NutriTrainer</p>
        </div>
      </section>
    </div>
  );
}
