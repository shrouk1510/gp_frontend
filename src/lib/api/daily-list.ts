import api_root from "@/axios";

export const getTodayDailyListRequest = async () => {
  try {
    const promise = await api_root.api.get("/dailyList/all");
    // console.log(promise);

    if (promise.status !== 200) {
      throw Error(promise.statusText);
    }
    const response = await promise.data;
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getDailyListMealsRequest = async () => {
  try {
    const promise = await api_root.api.get("/dailyList/meals");
    // console.log(promise);

    if (promise.status !== 200) {
      throw Error(promise.statusText);
    }
    const response = await promise.data;
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getDailyListExercisesRequest = async () => {
  try {
    const promise = await api_root.api.get("/dailyList/exercises");
    // console.log(promise);

    if (promise.status !== 200) {
      throw Error(promise.statusText);
    }
    const response = await promise.data;
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getDailyListMedicationsRequest = async () => {
  try {
    const promise = await api_root.api.get("/dailyList/medications");
    // console.log(promise);

    if (promise.status !== 200) {
      throw Error(promise.statusText);
    }
    const response = await promise.data;
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const saveDailyListRequest = async (
  values: {
    meals: { name: string; description: string }[];
    exercises: { name: string; duration: string }[];
    medications: { name: string; dosage: string }[];
    exerciseAlertTime: string;
    mealAlertTime: string;
    medicationAlertTime: string;
  }
  // role: "ADMIN" | "USER"
) => {
  const promise = await api_root.api.post("/dailyList/save", values);

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};
