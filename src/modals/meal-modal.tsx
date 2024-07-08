"use client";
import "./modal.css";
import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { convertImageBlobToUrl } from "../lib/helpers/convert-image-blob";

import { useModal } from "../hooks/use-modal-store";
import MealForm from "../MealFormComponent/Meal";

const MealModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "meal";
  const { meal = null } = data;

  // const imageUrl = convertImageBlobToUrl(article?.articlePhoto || "");
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center">
            {meal?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <MealForm initialMeal={meal} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MealModal;
