import { MedicalRecordType } from "@/types";
import api_root from "../../axios";

export const getAllUserMedicalRecordsRequest = async () => {
  try {
    const promise = await api_root.api.get("/medical-records/list");
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

export const getAllMedicalRecordsByRecordTypeIdRequest = async (
  recordTypeId: number
) => {
  try {
    const promise = await api_root.api.get(
      `/medical-records/list/${recordTypeId}`
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

export const getAllMedicalRecordTypesRequest = async () => {
  try {
    const promise = await api_root.api.get("/medical-records/types");
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

export const getGraphDataRequest = async (values: {
  recordTypeId: number;
  startDate: string;
}) => {
  const keyValuePairs = Object.entries(values).map(
    ([key, value]) => `${key}=${value}`
  );
  const keyValueString = keyValuePairs.join("&");

  try {
    const promise = await api_root.api.get(
      `/medical-records/graph?${keyValueString}`
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

export const uploadMedicalRecordRequest = async (values: {
  recordTypeId: number;
  measurements: number;
  note: string;
  date: Date;
}) => {
  const promise = await api_root.api.post("/medical-records/upload", values);

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response: MedicalRecordType = await promise.data;
  return response;
};

export const updateMedicalRecordRequest = async (values: {
  recordId: number;
  measurements: number;
  note: string;
  date: Date;
  recordTypeId: number;
}) => {
  // try {
  // console.log(values);

  const promise = await api_root.api.put(`/medical-records/update`, values);

  if (![200, 201].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const deleteMedicalRecordRequest = async (
  medicalRecordId: number
  // role: "ADMIN" | "USER"
) => {
  // try {
  // console.log(values);

  const promise = await api_root.api.delete(
    `/medical-records/delete/${medicalRecordId}`
  );

  if (![200, 204].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};
