"use client";

import { useEffect, useState } from "react";
import ShowArticleModal from "../modals/article-modal";
import MedicationModal from "../modals/medication-modal";
import MealModal from "../modals/meal-modal";
import ExerciseModal from "../modals/exercise-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ShowArticleModal />
      <MedicationModal />
      <MealModal />
      <ExerciseModal />
    </>
  );
};

export default ModalProvider;
