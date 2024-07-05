import api_root from "@/axios";

export const getAllReviewsRequest = async () => {
  try {
    const promise = await api_root.api.get("/reviews");
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

export const addReviewRequest = async (
  values: { value: number; feedback: string },
  role: "ADMIN" | "USER"
) => {
  const url = role === "ADMIN" ? "/reviews/admin/add" : "/reviews/add";

  const keyValuePairs = Object.entries(values).map(
    ([key, value]) => `${key}=${value}`
  );
  const keyValueString = keyValuePairs.join("&");

  const promise = await api_root.api.post(url.concat(keyValueString));

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const updateReviewRequest = async (
  values: { value: number; feedback: string },
  reviewId: number,
  role: "ADMIN" | "USER"
) => {
  // try {
  // console.log(values);
  const url =
    role === "ADMIN"
      ? `/reviews/admin/update/${reviewId}?`
      : `/reviews/user/update/${reviewId}?`;

  const keyValuePairs = Object.entries(values).map(
    ([key, value]) => `${key}=${value}`
  );
  const keyValueString = keyValuePairs.join("&");

  const promise = await api_root.api.put(url.concat(keyValueString));

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const deleteReviewRequest = async (
  reviewId: number,
  role: "ADMIN" | "USER"
) => {
  // try {
  // console.log(values);
  const url =
    role === "ADMIN"
      ? `/reviews/admin/delete/${reviewId}`
      : `/reviews/user/delete/${reviewId}`;

  const promise = await api_root.api.delete(url);

  if (![200, 204].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};
