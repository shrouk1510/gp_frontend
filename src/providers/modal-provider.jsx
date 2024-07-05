"use client";

import { useEffect, useState } from "react";
import ShowArticleModal from "../modals/article-modal";

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
    </>
  );
};

export default ModalProvider;
