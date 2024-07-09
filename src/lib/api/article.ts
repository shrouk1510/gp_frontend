import { ArticleType } from "@/types";
import api_root from "../../axios";

export const getAllArticlesRequest = async () => {
  try {
    const promise = await api_root.api.get("/articles");
    // console.log(promise);

    if (promise.status !== 200) {
      throw Error(promise.statusText);
    }
    const response = await promise.data;
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllArticleCatigoriesRequest = async () => {
  try {
    const promise = await api_root.api.get("/articles/categories");
    // console.log(promise);

    if (promise.status !== 200) {
      throw Error(promise.statusText);
    }
    const response = await promise.data;
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllArticlesByCatigoryIdRequest = async (categoryId: string) => {
  try {
    const promise = await api_root.api.get(
      `/articles/categories/${categoryId}`
    );
    // console.log(promise);

    if (promise.status !== 200) {
      throw Error(promise.statusText);
    }
    const response = await promise.data;
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const searchArticlesRequest = async (query: string) => {
  try {
    const promise = await api_root.api.post(
      `/api/articles/search?query=${query}`
    );
    // console.log(promise);

    if (promise.status !== 200) {
      throw Error(promise.statusText);
    }
    const response: ArticleType[] = await promise.data;
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getArticleByIdRequest = async (articleId: number) => {
  const promise = await api_root.api.get(`/articles/${articleId}`);

  if (promise.status !== 200) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const uploadArticlePhotoRequest = async (
  values: { photo: File },
  articleId: number
  // role: "ADMIN" | "USER"
) => {
  const formData = new FormData();
  formData.append("photo", values.photo);
  const promise = await api_root.api.post(
    `/articles/${articleId}/upload-photo`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const addArticleRequest = async (
  values: { name: string; content: string; categoryId: number }
  // role: "ADMIN" | "USER"
) => {
  const promise = await api_root.api.post("/articles/post", values);

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const updateArticleRequest = async (
  values: {
    name: string;
    content: string;
    categoryId: number;
    hide?: boolean;
    // articlePhoto?: string | null;
  },
  articleId: number
) => {
  // try {
  // console.log(values);

  const promise = await api_root.api.put(
    `/articles/update/${articleId}`,
    values
  );

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const deleteArticleRequest = async (articleId: number) => {
  // try {
  // console.log(values);

  const promise = await api_root.api.delete(`/articles/delete/${articleId}`);

  if (![200, 204].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};
