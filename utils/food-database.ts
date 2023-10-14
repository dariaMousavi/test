//API call to use db method for autofill search
import { Nutrients, FoodData } from '@/lib/types';

export const getAutoFillResults = async (currentInput: string) => {
  //api requires empty spaces to be replaced with %20
  const transformedInput = currentInput.replace(/\s+/g, '%20');
  const res: Response = await fetch(
    `https://api.edamam.com/auto-complete?app_id=4fd7bfa8&app_key=%2090a867d4fdf8ecfdc3258b489ab7fbbc%09&q=${transformedInput}&limit=6`
  );
  const arrayOfFoods: string[] = await res.json();
  return arrayOfFoods;
};

export const getFoodData = async (food: string) => {
  const res: Response = await fetch(
    `https://api.edamam.com/api/food-database/v2/parser?app_id=4fd7bfa8&app_key=90a867d4fdf8ecfdc3258b489ab7fbbc&ingr=${food}&nutrition-type=cooking`
  );
  const dirtyData = await res.json();
  const arrayOfFoods = dirtyData.hints;
  const cleanedData: FoodData[] = arrayOfFoods.map((item: any) => {
    const foodObj = item.food;
    return {
      foodId: foodObj.foodId,
      label: foodObj.label,
      nutrients: {
        calories: foodObj.nutrients.ENERC_KCAL
          ? Number(foodObj.nutrients.ENERC_KCAL.toFixed(2))
          : 0,
        protein: foodObj.nutrients.PROCNT
          ? Number(foodObj.nutrients.PROCNT.toFixed(2))
          : 0,
        fat: foodObj.nutrients.FAT
          ? Number(foodObj.nutrients.FAT.toFixed(2))
          : 0,
        carbs: foodObj.nutrients.CHOCDF
          ? Number(foodObj.nutrients.CHOCDF.toFixed(2))
          : 0,
        fibre: foodObj.nutrients.FIBTG
          ? Number(foodObj.nutrients.FIBTG.toFixed(2))
          : 0,
      },
      image: foodObj.image,
    };
  });
  return cleanedData;
};
