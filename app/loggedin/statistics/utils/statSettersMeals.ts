import { useUserStore } from "@/lib/store/store";
import {  Meal } from "@/lib/types";

export const averageCaloriesPreviousMeals = (userMealHistory: Meal[], noOfMeals: number) => {
  const reversed = userMealHistory.slice().reverse()
  if(reversed.length > noOfMeals) {
    let calorieCount = 0
    for(let i=0; i<noOfMeals; i++){
      calorieCount += reversed[i].totalCals
    }
    calorieCount = calorieCount/noOfMeals
    return {calorieCount}
  }
  let calorieCount = 0
  let overHowManyMeals = 0
  for(let i=0; i<reversed.length; i++){
    calorieCount += reversed[i].totalCals
    overHowManyMeals = i
  }
  calorieCount = calorieCount/noOfMeals
  return {calorieCount, overHowManyMeals}
}

export const mostEatenFoods = (meals: Meal[], count:number) => {
  const ingredientCounts: { [ingredientName: string]: number } = {};

  for (const meal of meals) {
    for (const ingredient of meal.ingredients) {
      const ingredientName = ingredient.name;
      if (ingredientCounts[ingredientName]) {
        ingredientCounts[ingredientName]++;
      } else {
        ingredientCounts[ingredientName] = 1;
      }
    }
  }
  const sortedIngredients = Object.keys(ingredientCounts).sort(
    (a, b) => ingredientCounts[b] - ingredientCounts[a]
  );
    return sortedIngredients.slice(0,count)
}


