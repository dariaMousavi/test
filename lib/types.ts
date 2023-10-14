export type User = {
  id: string;
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  exerciseHistory: Session[];
  mealHistory: Meal[];
  createdAt: Date;
  updatedAt: Date;
};

//Meal related types
export type Meal = {
  id: string;
  ingredients: Ingredient[];
  userId: string;
  user: User;
  type?: string;
  totalCals: number;
};

export type Ingredient = {
  name: string;
  nutrients: Nutrients;
  amount: number;
};

export type Nutrients = {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fibre: number;
};

export type FoodData = {
  foodId: string;
  label: string;
  nutrients: Nutrients;
  image: string;
};

export type AverageCalories = {
  calorieCount: number
  overHowManyMeals?: number
}

//Exercise related types

export type Session = {
  id: string 
  activities: NewSessionList[]
  caloriesBurned: number
  time: string
  createdAt?: Date
  userId: string 
  user?: User
}

export type NewSessionList = {
    activity: string
    calsBurned: number
    duration: number
}

export type CleanActivityData = {
  activity: string;
  caloriesPerHour: number;
};

export type DirtyActivityData = {
  name: string;
  calories_per_hour: number;
  duration_minutes: number;
  total_calories: number;
};

