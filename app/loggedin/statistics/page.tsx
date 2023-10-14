'use client'
import React from 'react';
import Image from 'next/image';
import HeaderPage from '@/lib/components/HeaderPage';
import Button from '@/lib/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { users } from '@/utils/mockData';
import { useUserStore } from '@/lib/store/store';
import prisma from '@/lib/components/prismadb';
import {useEffect} from 'react'

const share = (
  <FontAwesomeIcon icon={faShare} size="2xl" style={{ color: '#2de86b' }} />
);

export default function StatisticsPage() {

  useEffect(()=>{
    getUser()
  }, [])
  async function getUser() {
    const res = await fetch('/api/test')
    const data = await res.json()
    console.log('USER DATA ', data)
  }
  // const userData = useUserStore.getState().data

  return (
    <div className={'sectionMainPages'}>
      <HeaderPage title={'Statistic '} />
      <h3 className="text-lg mx-6 my-3 ">Hi panda, check and share it!</h3>

      <section
        className={`cardBgPhoto flex flex-col items-center bg-cover relative`}
      >
        <div>
          <Image
            src="/images/bananas.jpg"
            alt="exercise icon"
            fill={true}
            style={{ objectFit: 'cover' }}
            className="absolute rounded-lg  opacity-50"
            priority={true}
          />
        </div>
        <div className="z-20 flex flex-col items-center  ">
          <div className="bg-mainWhite border-2 border-mainGreen w-20 h-20 rounded-full flex justify-center items-center ">
            {/* TODO: change this for real number from user data */}
            <p className=" text-mainBlack text-center font-bold">25%</p>
          </div>
          <p className="">2 of 5 complete</p>
        </div>
      </section>

      <section className="flex justify-between mx-6 my-3 ">
        <Button title={'October'} />
        <button>{share}</button>
      </section>

      <section>
        {users.map((user) => (
          <div className="flex flex-col gap-2" key={user.id}>
            <h6 className="mx-6 text-lg ">Your activities this month:</h6>
            {user.exerciseHistory.map((exercise, index) => (
              <div className={`cardBackground my-0`} key={index}>
                <p className="font-semibold">{exercise}</p>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
