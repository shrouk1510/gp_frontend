import api_root from "../../axios";

export const getAllActiveSessionsRequest = async (categoryId: string) => {
  try {
    const promise = await api_root.api.get(`/debug/all-sessions`);
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

export const uploadUserPhotoRequest = async (
  values: { photo: File }
  // role: "ADMIN" | "USER"
) => {
  const formData = new FormData();
  formData.append("photo", values.photo);
  const promise = await api_root.api.post("/user/upload-photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const createAdminRequest = async (values: {
  username: string;
  password: string;
  email: string;
}) => {
  // try {
  // console.log(values);

  const promise = await api_root.api.post(`/admin/signup`, values);

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const updateAdminRequest = async (values: {
  username: string;
  password: string;
}) => {
  // try {
  // console.log(values);

  const promise = await api_root.api.put(
    `/admin/update?newUsername=${values.username}&newPassword=${values.password}`
  );

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const deleteAdminRequest = async (values?: { username: string }) => {
  // try {
  // console.log(values);

  const promise = await api_root.api.delete(`/admin/delete`);

  if (![200, 204].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};
