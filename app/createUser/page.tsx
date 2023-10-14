'use client';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';
import { User } from '@/lib/types';
import { setJWT } from '@/lib/jwt';

function CreateAccount() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputs, setInputs] = useState<User>({} as User);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      console.log('INPUTS::', inputs);
      const response = await axios.post('/api/users/signUp', inputs);
      //console.log("IT WORKS::", response)
      setJWT(response.data.token);
      setInputs({} as User);
      //TODO give token to user and encrypt the password, set status to global store
      router.push('/');
      return response;
    } catch (err) {
      console.error('Failed to submit form:: ', err);
    }
  };

  //? any better way to write ts
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const name: string = event.currentTarget.name;
    const value: string = event.currentTarget.value;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div
      className={`sectionMainPages  bg-gradient-to-b from-mainGreen to-mainBlack `}
    >
      <section className="mt-5 flex flex-col justify-center items-center ">
        <Image
          src="/logo.png"
          width={256}
          height={183}
          alt="Health Boss Logo"
          priority={true}
        />
        <h1 className="text-center font-semibold">Create an account</h1>
      </section>

      <section className="mx-5">
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <label className="font-semibold text-base" htmlFor="userName">
              User Name
            </label>
            <input
              className="inputLogin"
              type="text"
              id="userName"
              name="userName"
              placeholder="Your user name here"
              value={inputs.userName || ''}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="font-semibold text-base" htmlFor="firstName">
              First name
            </label>
            <input
              className="inputLogin"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Your first name here"
              value={inputs.firstName || ''}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="font-semibold text-base" htmlFor="lastName">
              Last name
            </label>
            <input
              className="inputLogin"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Your last name here"
              value={inputs.lastName || ''}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="font-semibold text-base" htmlFor="email">
              Email
            </label>
            <input
              className="inputLogin"
              type="email"
              id="email"
              name="email"
              placeholder="email@email.com"
              value={inputs.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="font-semibold text-base" htmlFor="password">
              Password
            </label>
            <input
              className="inputLogin"
              type="password"
              id="password"
              name="password"
              placeholder="New password"
              value={inputs.password || ''}
              onChange={handleChange}
            />
          </div>

          <button
            className={`buttonLogin bg-lightGreen text-mainBlack hover:scale-110`}
            type="submit"
            value="Submit"
          >
            Create account
          </button>
        </form>
      </section>
    </div>
  );
}

export default CreateAccount;
