import { ArticleType } from "@/types";
import { create } from "zustand";

// export type ModalType = "createActor";

interface ArticleStore {
  articles: ArticleType[] | null;
  setArticles(articles: ArticleType[]): void;
  addArticle: (article: ArticleType) => void;
  updateArticle: (article: ArticleType) => void;
  removeArticle: (articleId: number) => void;
}

export const useArticleStore = create<ArticleStore>((set) => ({
  articles: null,
  setArticles: (articles: ArticleType[]) => set({ articles }),
  addArticle: (article: ArticleType) =>
    set((state) => {
      return {
        articles: state.articles ? [...state.articles, article] : [article],
      };
    }),
  updateArticle: (article: ArticleType) =>
    set((state) => {
      const filteredArticles = state.articles?.filter(
        (temp) => temp.articleId !== article.articleId
      );
      return {
        articles: filteredArticles ? [...filteredArticles, article] : [article],
      };
    }),
  removeArticle: (articleId: number) =>
    set((state) => {
      const filteredArticles = state.articles?.filter(
        (article) => article.articleId !== articleId
      );

      console.log(filteredArticles);
      return {
        articles: filteredArticles || [],
      };
    }),
}));
