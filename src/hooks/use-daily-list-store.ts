import { DailyListType, ExecriseType, MealType, MedicationType } from "@/types";
import { create } from "zustand";

// export type ModalType = "createActor";

interface DailyListStore {
  // dailyLists: DailyListType[] | null;
  dailyList: DailyListType | null;
  meals: MealType[] | null;
  execrises: ExecriseType[] | null;
  medications: MedicationType[] | null;
  // setDailyLists(dailyLists: DailyListType[]): void;
  // addDailyList: (dailyList: DailyListType) => void;
  // updateDailyList: (dailyList: DailyListType) => void;
  // removeDailyList: (dailyListId: number) => void;
  setDailyList: (dailyList: DailyListType) => void;
  // updateDailyList: (dailyList: DailyListType) => void;
  // removeDailyList: (dailyListId: number) => void;
}

export const useDailyListStore = create<DailyListStore>((set) => ({
  // dailyLists: null,
  dailyList: null,
  meals: null,
  medications: null,
  execrises: null,
  setDailyList: (dailyList: DailyListType) =>
    set({
      dailyList,
      meals: dailyList.meals,
      medications: dailyList.medications,
      execrises: dailyList.exercises,
    }),
  // setDailyLists: (dailyLists: DailyListType[]) => set({ dailyLists }),

  // addDailyList: (dailyList: DailyListType) =>
  //   set((state) => {
  //     return {
  //       dailyLists: state.dailyLists
  //         ? [...state.dailyLists, dailyList]
  //         : [dailyList],
  //     };
  //   }),
  // updateDailyList: (dailyList: DailyListType) =>
  //   set((state) => {
  //     const filteredDailyLists = state.dailyLists?.filter(
  //       (temp) => temp.dailyListId !== dailyList.dailyListId
  //     );
  //     return {
  //       dailyLists: filteredDailyLists
  //         ? [...filteredDailyLists, dailyList]
  //         : [dailyList],
  //     };
  //   }),
  // removeDailyList: (dailyListId: number) =>
  //   set((state) => {
  //     const filteredDailyLists = state.dailyLists?.filter(
  //       (dailyList) => dailyList.dailyListId !== dailyListId
  //     );
  //     return {
  //       dailyLists: filteredDailyLists || [],
  //     };
  //   }),
}));
