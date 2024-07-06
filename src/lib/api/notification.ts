import { NotificationType } from "@/types";
import api_root from "../../axios";

export const getAllUserNotificationsRequest = async () => {
  try {
    const promise = await api_root.api.get("/notifications/");
    // console.log(promise);

    if (promise.status !== 200) {
      throw Error(promise.statusText);
    }
    const response: NotificationType[] = await promise.data;
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const markNotificationReadByIdRequest = async (
  notificationId: number
) => {
  const promise = await api_root.api.post(
    `/notifications/${notificationId}/read`
  );

  if (![200].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};

export const markAllNotificationsReadRequest = async () => {
  const promise = await api_root.api.post(`/notifications/all/read`);

  if (![200].includes(promise.status)) {
    throw Error(promise.statusText);
  }
  const response = await promise.data;
  return response;
};
