import { DailyListType, ExecriseType, MealType, MedicationType } from "@/types";
import { create } from "zustand";

// export type ModalType = "createActor";

interface DailyListStore {
  dailyLists: DailyListType[] | null;
  meals: MealType[] | null;
  exercises: ExecriseType[] | null;
  medications: MedicationType[] | null;
  // setDailyLists(dailyLists: DailyListType[]): void;
  // addDailyList: (dailyList: DailyListType) => void;
  // updateDailyList: (dailyList: DailyListType) => void;
  // removeDailyList: (dailyListId: number) => void;
  setMeals: (dailyList: DailyListType[]) => void;
  setMedications: (dailyList: DailyListType[]) => void;
  setExercises: (dailyList: DailyListType[]) => void;
  // updateDailyList: (dailyList: DailyListType) => void;
  // removeDailyList: (dailyListId: number) => void;
}

export const useDailyListStore = create<DailyListStore>((set) => ({
  // dailyLists: null,
  dailyLists: null,
  meals: null,
  medications: null,
  exercises: null,
  setDailyList: (dailyLists: DailyListType[]) =>
    set({
      dailyLists,
      meals: dailyLists.reduce((meals, curr) => [...meals, ...curr.meals], []),
      medications: dailyLists.reduce(
        (medications, curr) => [...medications, ...curr.medications],
        []
      ),
      exercises: dailyLists.reduce(
        (exercises, curr) => [...exercises, ...curr.exercises],
        []
      ),
    }),
  setMeals: (dailyList: DailyListType[]) => set({}),
  setMedications: (dailyList: DailyListType[]) => set({}),
  setExercises: (dailyList: DailyListType[]) => set({}),
}));
