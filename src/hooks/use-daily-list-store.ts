import { DailyListType, ExecriseType, MealType, MedicationType } from "@/types";
import { create } from "zustand";

// export type ModalType = "createActor";

interface DailyListStore {
  dailyLists: DailyListType[] | null;
  meals: MealType[] | null;
  exercises: ExecriseType[] | null;
  medications: MedicationType[] | null;
  setDailyList(dailyList: DailyListType): void;
  // addDailyList: (dailyList: DailyListType) => void;
  // updateDailyList: (dailyList: DailyListType) => void;
  // removeDailyList: (dailyListId: number) => void;
  setMeals: (meals: MealType[]) => void;
  setMedications: (medications: MedicationType[]) => void;
  setExercises: (exercises: ExecriseType[]) => void;
  updateMeal: (meal: MealType) => void;
  updateMedication: (medication: MedicationType) => void;
  updateExercise: (exercise: ExecriseType) => void;
  // updateDailyList: (dailyList: DailyListType) => void;
  // removeDailyList: (dailyListId: number) => void;
}

export const useDailyListStore = create<DailyListStore>((set) => ({
  // dailyLists: null,
  dailyLists: null,
  meals: null,
  medications: null,
  exercises: null,
  // add only
  setDailyList: (dailyList: DailyListType) =>
    set({
      dailyLists: [dailyList],
      meals: dailyList.meals,
      medications: dailyList.medications,
      exercises: dailyList.exercises,
    }),
  setMeals: (meals: MealType[]) => set({ meals }),
  updateMeal: (meal: MealType) =>
    set((state) => {
      const indexToUpdate = state.meals?.findIndex(
        (object) => object.id === meal.id
      );

      if (indexToUpdate !== -1) {
        // Destructure and update properties in-place
        const meals = state.meals ?? [];
        meals[indexToUpdate] = meal;
        console.log(state);

        return {
          ...state,
          meals,
        };
      } else {
        console.error(
          "Object with id",
          indexToUpdate,
          "not found in the array."
        );
        return { ...state };
      }
    }),

  setMedications: (medications: MedicationType[]) => set({ medications }),
  updateMedication: (medication: MedicationType) =>
    set((state) => {
      const indexToUpdate = state.medications?.findIndex(
        (object) => object.id === medication.id
      );

      if (indexToUpdate !== -1) {
        // Destructure and update properties in-place
        state.medications[indexToUpdate] = medication;
      } else {
        console.warn(
          "Object with id",
          indexToUpdate,
          "not found in the array."
        );
      }
      return state;
    }),
  setExercises: (exercises: ExecriseType[]) => set({ exercises }),
  updateExercise: (exercise: ExecriseType) =>
    set((state) => {
      const indexToUpdate = state.medications?.findIndex(
        (object) => object.id === exercise.id
      );

      if (indexToUpdate !== -1) {
        // Destructure and update properties in-place
        state.exercises[indexToUpdate] = exercise;
      } else {
        console.warn(
          "Object with id",
          indexToUpdate,
          "not found in the array."
        );
      }
      return state;
    }),
}));
