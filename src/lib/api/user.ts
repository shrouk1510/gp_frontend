import api_root from "@/axios";

export const uploadUserPhotoRequest = async (
  values: { photo: File }
  // role: "ADMIN" | "USER"
) => {
  const promise = await api_root.api.post("/user/upload-photo", values);

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};
