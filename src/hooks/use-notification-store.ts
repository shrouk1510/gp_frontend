import { NotificationType } from "@/types";
import { create } from "zustand";

// export type ModalType = "createActor";

interface NotificationStore {
  notifications: NotificationType[] | null;
  unReadNotifications: NotificationType[] | null;
  setNotifications(notifications: NotificationType[]): void;
  addNotification: (notification: NotificationType) => void;
  markNotificationAsRead: (notificationId: number) => void;
  markAllNotificationAsRead: () => void;
  updateNotification: (notification: NotificationType) => void;
  removeNotification: (notificationId: number) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: null,
  unReadNotifications: null,
  setNotifications: (notifications: NotificationType[]) =>
    set({
      notifications,
      unReadNotifications: notifications.filter(
        (notification) => !notification.readFlag
      ),
    }),
  markNotificationAsRead: (notificationId: number) =>
    set((state) => {
      const notification = state.notifications?.find(
        (notification) => notification.id === notificationId
      );
      if (!notification) {
        return state;
      }

      notification.readFlag = true;

      const filteredNotifications = state.notifications.filter(
        (notification) => notification.id !== notificationId
      );
      return {
        notifications: [...filteredNotifications, notification],
      };
    }),
  markAllNotificationAsRead: () =>
    set((state) => {
      if (!state.notifications || state.notifications?.length === 0) {
        return state;
      }

      const updatedNotifications = state.notifications?.map((notification) => {
        notification.readFlag = true;
        return notification;
      });
      return {
        notifications: updatedNotifications,
      };
    }),
  addNotification: (notification: NotificationType) =>
    set((state) => {
      return {
        notifications: state.notifications
          ? [...state.notifications, notification]
          : [notification],
      };
    }),
  updateNotification: (notification: NotificationType) =>
    set((state) => {
      const filteredNotifications = state.notifications?.filter(
        (temp) => temp.id !== notification.id
      );
      return {
        notifications: filteredNotifications
          ? [...filteredNotifications, notification]
          : [notification],
      };
    }),
  removeNotification: (notificationId: number) =>
    set((state) => {
      const filteredNotifications = state.notifications?.filter(
        (notification) => notification.id !== notificationId
      );
      return {
        notifications: filteredNotifications || [],
      };
    }),
}));
