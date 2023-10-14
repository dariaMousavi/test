'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

type NavbarTracker = {
  exercises: string;
  meals: string;
  home: string;
  statistics: string;
  profile: string;
};

const user = (
  <FontAwesomeIcon icon={faUser} size="2xl" style={{ color: '#2de86b' }} />
);
const statistic = (
  <FontAwesomeIcon
    icon={faChartSimple}
    size="2xl"
    style={{ color: '#2de86b' }}
  />
);
const home = (
  <FontAwesomeIcon icon={faHouse} size="2xl" style={{ color: '#2de86b' }} />
);
const meal = (
  <FontAwesomeIcon icon={faUtensils} size="2xl" style={{ color: '#2de86b' }} />
);
const exercise = (
  <FontAwesomeIcon icon={faDumbbell} size="2xl" style={{ color: '#2de86b' }} />
);

export default function Navbar() {
  const [page, setPage] = useState({
    exercises: '',
    meals: '',
    home: 'highlighted',
    statistics: '',
    profile: '',
  });

  function handlePageChange(nextPage: string) {
    const newState: NavbarTracker = {
      exercises: '',
      meals: '',
      home: '',
      statistics: '',
      profile: '',
    };

    (newState as any)[nextPage] = 'highlighted';
    setPage(newState);
  }
  return (
    <div className="flex justify-around items-center h-full ">
      <Link
        className={`${
          page.profile === 'highlighted' ? 'bg-mainNavGreen' : ''
        } `}
        onClick={() => handlePageChange('profile')}
        href="/loggedin/profile"
      >
        <span className="hover:scale-110">{user}</span>
      </Link>

      <Link
        className={`${
          page.statistics === 'highlighted' ? 'bg-mainNavGreen' : ''
        }`}
        onClick={() => handlePageChange('statistics')}
        href="/loggedin/statistics"
      >
        <span>{statistic}</span>
      </Link>
      <Link
        className={`${page.home === 'highlighted' ? 'bg-mainNavGreen' : ''}`}
        onClick={() => handlePageChange('home')}
        href="/loggedin/"
      >
        <span>{home}</span>
      </Link>
      <Link
        className={`${
          page.exercises === 'highlighted' ? 'bg-mainNavGreen' : ''
        }`}
        onClick={() => handlePageChange('exercises')}
        href="/loggedin/exercises"
      >
        <span>{exercise}</span>
      </Link>

      <Link
        className={`${page.meals === 'highlighted' ? 'bg-mainNavGreen' : ''}`}
        onClick={() => handlePageChange('meals')}
        href="/loggedin/meals"
      >
        <span>{meal}</span>
      </Link>
    </div>
  );
}
