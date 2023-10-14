import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import MotivationQuote from '@/lib/components/MotivationQuote';
import { users } from '@/utils/mockData';
import HeaderPage from '@/lib/components/HeaderPage';

const chart = (
  <FontAwesomeIcon icon={faChartPie} size="5x" style={{ color: '#2de86b' }} />
);
const walk = (
  <FontAwesomeIcon
    icon={faShoePrints}
    size="2xl"
    style={{ color: '#2de86b' }}
  />
);
const notication = (
  <FontAwesomeIcon icon={faBell} size="sm" style={{ color: '#2de86b' }} shake />
);
const sleep = (
  <FontAwesomeIcon icon={faBed} size="2xl" style={{ color: '#2de86b' }} />
);

const meal = (
  <FontAwesomeIcon icon={faUtensils} size="2xl" style={{ color: '#2de86b' }} />
);

export default function HomePage() {
  // TODO: check if user is logged in already, if not redirect to /login

  return (
    <div className={`sectionMainPages  `}>
      <HeaderPage title={'Home'} />

      <section className="mx-6 my-3 flex flex-col justify-center ">
        <div className="p-2 flex font-bold justify-between">
          <h5 className="text-3xl">Hi {users[0].fistName}</h5>
          <div className="flex gap-2 items-center">
            {' '}
            {notication} <p>+1</p>
          </div>
        </div>

        <MotivationQuote />
      </section>

      <section className={` flex flex-col`}>
        <h4 className={'titlehome'}>Your activities</h4>
        <div className={`cardBackground flex justify-between items-center`}>
          <div className="flex flex-col gap-2">
            {walk}
            <p className="text-sm">Walking</p>
          </div>

          <p className="text-5xl font-bold">9857</p>
          <p>Steps</p>
        </div>

        <div className={`cardBackground flex justify-between items-center`}>
          <div className="flex flex-col gap-2 items-center">
            {sleep}
            <p className="text-sm">Time in bed</p>
          </div>

          <p className="text-5xl font-bold">5h 19m</p>
          <div></div>
        </div>

        <div className={`cardBackground flex justify-between items-center`}>
          <div className="flex flex-col gap-2">
            {meal}
            <p className="text-sm">Daily Calories</p>
          </div>

          <p className="text-5xl font-bold">1200</p>
          <p>cal</p>
        </div>
      </section>

      <section>
        <h4 className={'titlehome'}>How close to your goal (Monthly)</h4>
        <div className={`cardBackground flex justify-around w-full"`}>
          <div className="flex h-full self-center">
            <span>{chart}</span>
          </div>
          <div className="">
            <div className="mb-3">
              <h6 className="font-semibold">Walk</h6>
              <p className="text-base"> 9857/280.00 steeps</p>
            </div>

            <div className="mb-3">
              <h6 className="font-semibold">Sleep</h6>
              <p className="text-base"> 9857/196 hours</p>
            </div>

            <div>
              <h6 className="font-semibold">Calories</h6>
              <p className="text-base"> 9857/70.000 cal</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
