import api_root from "../../axios";

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
