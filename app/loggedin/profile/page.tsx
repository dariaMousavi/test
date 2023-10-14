import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@/lib/components/Button';

// TODO: need to change this for real data from DB!!
import { users } from '@/utils/mockData';

const plus = (
  <FontAwesomeIcon icon={faCirclePlus} size="lg" style={{ color: '#2de86b' }} />
);

type Exercise = {};

export default function ProfilePage() {
  const getExerciseUnit = (exerciseType: string) => {
    switch (exerciseType) {
      case 'walk':
        return 'steeps';
      case 'sleep':
        return 'hours';
      case 'calories':
        return 'cal';
      default:
        return '';
    }
  };

  return (
    <div className={`sectionMainPages `}>
      <section className="relative flex flex-col items-center ">
        <div className="flex-col h-[200px] w-full flex justify-between items-center bg-lightGreen rounded-b-[9rem] shadow-md relative">
          <div className=" flex my-4 h-16 justify-center items-center w-full font-bold ">
            <h4 className="text-mainBlack">Profile</h4>
          </div>
        </div>

        <div className="flex absolute justify-end top-20 ">
          <Image
            src="/profile.jpg"
            alt="exercise icon"
            width={170}
            height={170}
            className="item-center rounded-full border-4 border-mainGreen shadow-md relative"
            priority={true}
          />
          <span className="ml-[8.5rem] mt-32 absolute shadow-lg">{plus}</span>
        </div>
      </section>

      <section className="flex mt-14 gap-2 justify-center font-bold">
        {/* TODO: This should note be 0 when we have user by id */}
        <h1 className="">{users[0].fistName}</h1>
        <h1> {users[0].lastName}</h1>
      </section>

      <div className="flex flex-col justify-around">
        <div>
          <section className={'cardProfile'}>
            <div className="flex justify-between">
              <h4 className={'titleCards'}>Info</h4>
              <Button title={'Edit Profile'} />
            </div>
            {users.map((user) => (
              <div className="mt-4 text-lg" key={user.id}>
                <p>
                  Name: <span>{user.fistName}</span>
                </p>
                <p>
                  Surname: <span>{user.lastName}</span>
                </p>
                <p>
                  Birthday: <span>{user.birthday}</span>
                </p>
                <p>
                  Email: <span>{user.email}</span>
                </p>
                <p typeof="password">
                  Password: <span>{user.password}</span>
                </p>
              </div>
            ))}
          </section>
        </div>

        <section className={`cardBackground `}>
          {users.map((user) => (
            <div className="flex flex-col gap-2" key={user.id}>
              <div className="flex justify-between">
                <h4 className={'titleCards'}>My Goals diary</h4>
                <Button title={'Edit Goals'} />
              </div>
              {Object.entries(user.goals).map(
                ([goalsName, goalValue], index) => (
                  <div className="flex justify-between text-lg" key={index}>
                    <p className="font-semibold">{goalsName}:</p>
                    <div className="flex gap-2">
                      <p className="">{goalValue}</p>
                      <p>{getExerciseUnit(goalsName)}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        </section>

        <div className="flex justify-center">
          <Link href="/loggedin/statistics">
            <p className="text-mainGreen font-semibold cursor-pointer hover:border-2 rounded-lg p-2">
              {/* //TODO: After MVP do we need to have another page for this ?? */}
              Check history
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
