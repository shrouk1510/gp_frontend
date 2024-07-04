import { ReviewType } from "@/types";
import { create } from "zustand";

// export type ModalType = "createActor";

interface ReviewStore {
  reviews: ReviewType[] | null;
  setReviews(reviews: ReviewType[]): void;
  addReview: (review: ReviewType) => void;
  updateReview: (review: ReviewType) => void;
  removeReview: (reviewId: number) => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  reviews: null,
  setReviews: (reviews: ReviewType[]) => set({ reviews }),
  addReview: (review: ReviewType) =>
    set((state) => {
      return {
        reviews: state.reviews ? [...state.reviews, review] : [review],
      };
    }),
  updateReview: (review: ReviewType) =>
    set((state) => {
      const filteredReviews = state.reviews?.filter(
        (temp) => temp.id !== review.id
      );
      return {
        reviews: filteredReviews ? [...filteredReviews, review] : [review],
      };
    }),
  removeReview: (reviewId: number) =>
    set((state) => {
      const filteredReviews = state.reviews?.filter(
        (review) => review.id !== reviewId
      );
      return {
        reviews: filteredReviews || [],
      };
    }),
}));
