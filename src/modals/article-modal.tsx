"use client";
import "./modal.css";
import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { convertImageBytesToUrl } from "../lib/helpers/convert-image-blob";

import { useModal } from "../hooks/use-modal-store";

const ShowArticleModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "showArticle";
  const { article } = data;

  const imageUrl = convertImageBytesToUrl(article?.articlePhoto || "");
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center">
            {article?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <img
            src={imageUrl}
            alt={`Tip ${article?.name}`}
            className="tip-image"
          />
          <h2>{article?.name}</h2>
          <p className="tip-description">{article?.content}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowArticleModal;
