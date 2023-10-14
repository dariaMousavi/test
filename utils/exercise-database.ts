import { CleanActivityData, DirtyActivityData } from '../lib/types';

export const getActivitiesList = async () => {
    const res: Response = await fetch('https://api.api-ninjas.com/v1/caloriesburnedactivities', {
        method: 'GET',
        headers: {
            "X-Api-Key": "M3E6uLa4vo3d5xnU6I5/YQ==P8C5PsirDGOxDnro"
        }
    })
    const data = await res.json()
    const arrayOfActivities: string[] = data.activities
    console.log(arrayOfActivities)
    return arrayOfActivities
}

export const getActivityDetails = async (activity: string, weight?: number) => {
    let arrayOfActivities = []
    activity = 'walk'
    console.log('ACTIVITY', `${activity}`)
    if (weight) {
        const res: Response = await fetch('https://api.api-ninjas.com/v1/caloriesburned?activity=Walking', {
            method: 'GET',
            headers: {
                "X-Api-Key": "M3E6uLa4vo3d5xnU6I5/YQ==P8C5PsirDGOxDnro"
            }
        })
        // console.log(res)
        // console.log(await res.json())
        arrayOfActivities = await res.json()
        // console.log('ARRAY RAR', array)
        // console.log('ARRAY IN IF', arrayOfActivities)
        //sorry Seb i realised that the API im using is garbage so this is bad right now
    } else {
        const res: Response = await fetch(`https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}`, {
            method: 'GET',
            headers: {
                "X-Api-Key": "M3E6uLa4vo3d5xnU6I5/YQ==P8C5PsirDGOxDnro"
            }
        })
        arrayOfActivities = await res.json() as DirtyActivityData[]
        console.log('ARRAY IN ELSE STATEMENT', arrayOfActivities)
    }
    console.log('ARRAOY OUTSIDE ELSE STATEMENT', arrayOfActivities)
    const cleanData: CleanActivityData[] = arrayOfActivities.map((activity: DirtyActivityData) => {
        return {
            activity: activity.name,
            caloriesPerHour: activity.calories_per_hour
        }
    })
    console.log('CLEAN DATA', cleanData)
    return cleanData
}

export const getAutoFillSuggestions = (
  currentInputValue: string,
  activitiesList: string[]
) => {
  const firstToUpperCase =
    currentInputValue.charAt(0).toUpperCase() + currentInputValue.slice(1);
  const filteredArr = activitiesList.filter(
    (activity) =>
      activity.includes(firstToUpperCase) && activity[0] === firstToUpperCase[0]
  );
  return filteredArr;
};
