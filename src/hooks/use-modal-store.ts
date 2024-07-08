import { ArticleType, ExecriseType, MealType, MedicationType } from "@/types";
import { create } from "zustand";

export type ModalType = "showArticle" | "meal" | "medication" | "exercise";

interface ModalData {
  exercise?: ExecriseType;
  meal?: MealType;
  medication?: MedicationType;
  article?: ArticleType;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
