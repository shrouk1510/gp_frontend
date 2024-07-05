"use client";

import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import { useModal } from "../hooks/use-modal-store";

const ShowArticleModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "showArticle";
  const { article } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center">
            {article?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4"></div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowArticleModal;
