'use client';
import React from 'react';
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

function HeaderPage({ title }: { title: React.ReactNode }) {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <>
      <section className="h-20 flex justify-between items-center  mx-5 mt-10">
        <button onClick={handleBackClick}>{back}</button>
        <h4 className="font-bold">{title}</h4>
        <Link href="/loggedin/profile">
          <Image
            src="/profile.jpg"
            alt="exercise icon"
            width={50}
            height={50}
            className="item-center text-mainWhite rounded-full border-2 border-mainGreen"
            priority={true}
          />
        </Link>
      </section>
    </>
  );
}

export default HeaderPage;
