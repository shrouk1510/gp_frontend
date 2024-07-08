import { DailyListType } from "@/types";
import api_root from "../../axios";

// export const getDailyListRequest = async () => {
//   try {
//     const promise = await api_root.api.get("/dailylist");
//     // console.log(promise);

//     if (promise.status !== 200) {
//       throw Error(promise.statusText);
//     }
//     const response = await promise.data;
//     return response;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

export const getDailyListMealsRequest = async () => {
  try {
    const promise = await api_root.api.get("/dailylist/meals");
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
    const promise = await api_root.api.get("/dailylist/exercises");
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
    const promise = await api_root.api.get("/dailylist/medications");
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

export const addDailyListMealRequest = async (
  values: {
    name: string;
    date: string;
    time: string;
  }
  // role: "ADMIN" | "USER"
) => {
  const promise = await api_root.api.post(
    `/dailylist/addMeal?date=${values.date}`,
    values
  );

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const addDailyListMedicationRequest = async (
  values: {
    name: string;
    dosage: string;
    date: string;
    time: string;
  }
  // role: "ADMIN" | "USER"
) => {
  const promise = await api_root.api.post(
    `/dailylist/addMedication?date=${values.date}`,
    values
  );

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const addDailyListExerciseRequest = async (
  values: {
    name: string;
    durationMinutes: number;
    date: string;
    time: string;
  }
  // role: "ADMIN" | "USER"
) => {
  const promise = await api_root.api.post(
    `/dailylist/addExercise?date=${values.date}`,
    values
  );

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const updateDailyListMealRequest = async (
  values: {
    name: string;
    date: string;
    time: string;
  },
  mealId: number
  // role: "ADMIN" | "USER"
) => {
  const promise = await api_root.api.put(
    `/dailylist/updateMeal/${mealId}`,
    values
  );

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response: DailyListType = await promise.data;
  return response;
};

export const updateDailyListMedicationRequest = async (
  values: {
    name: string;
    date: string;
    dosage: string;
    time: string;
  },
  medicationId: number
  // role: "ADMIN" | "USER"
) => {
  const promise = await api_root.api.put(
    `/dailylist/updateMedication/${medicationId}`,
    values
  );

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response: DailyListType = await promise.data;
  return response;
};

export const updateDailyListExerciseRequest = async (
  values: {
    name: string;
    durationMinutes: number;
    date: string;
    time: string;
  },
  exerciseId: number
  // role: "ADMIN" | "USER"
) => {
  const promise = await api_root.api.put(
    `/dailylist/updateExercise/${exerciseId}`,
    values
  );

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response: DailyListType = await promise.data;
  return response;
};
