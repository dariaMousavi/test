type User = {
  id: number;
  userName: string;
  email: string;
  password: number;
  fistName: string;
  lastName: string;
  birthday: string;
  goals: {
    walk: number;
    sleep: number;
    calories: number;
  };
  mealHistory: string[];
  exerciseHistory: string[];
};

const users: User[] = [
  {
    id: 1,
    userName: 'pandaBear',
    email: 'panda@gmail.com',
    password: 123,
    fistName: 'Panda',
    lastName: 'Bear',
    birthday: '20/12/00',
    goals: {
      walk: 10.0,
      sleep: 7,
      calories: 2500,
    },
    mealHistory: ['eggs', 'lettuce', 'orange'],
    exerciseHistory: [
      'Running',
      'Soccer',
      'Running',
      'Soccer',
      'Running',
      'Soccer',
    ],
  },
];

export { users };
