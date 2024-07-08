"use client";
import "./modal.css";
import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import { useModal } from "../hooks/use-modal-store";
import MedicationForm from "../MedicationFormComponent/mediction";

const MedicationModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "medication";
  const { medication = null } = data;

  // const imageUrl = convertImageBlobToUrl(article?.articlePhoto || "");
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center">
            {medication?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <MedicationForm intialMedication={medication} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationModal;
