import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";
import {
  getAllUserNotificationsRequest,
  markAllNotificationsReadRequest,
  markNotificationReadByIdRequest,
} from "../lib/api/notification";
import toast from "react-hot-toast";
import { useNotificationStore } from "../hooks/use-notification-store";
import { uploadUserPhotoRequest } from "../lib/api/user";

const UserProfile = () => {
  const { activeUser, logoutUser, logoutAdmin, updateUser, role } =
    useAuthContext();
  const {
    notifications,
    setNotifications,
    markNotificationAsRead,
    markAllNotificationAsRead,
  } = useNotificationStore();

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleUpdatePhoto = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    try {
      await uploadUserPhotoRequest({ photo: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // setUser({ ...user, profilePhoto: reader.result });
          updateUser("profilePhoto", reader.result);
        };
        reader.readAsDataURL(file);
      }
      toast.success("user image updated");
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
  };

  const handleLogout = async () => {
    try {
      if (role === "ADMIN") {
        await logoutAdmin();
        toast.success("Admin logout");
      } else {
        await logoutUser();
        toast.success("User logout");
      }

      navigate("/");
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
  };

  const handleReadAllNotifications = async () => {
    try {
      await markAllNotificationsReadRequest();
      markAllNotificationAsRead();
      toast.success("All notifications marked as read");
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
  };

  const handleReadNotification = async (notificationId) => {
    try {
      await markNotificationReadByIdRequest(notificationId);
      markNotificationAsRead(notificationId);
      toast.success("notification marked as read");
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
  };
  useEffect(() => {
    const fetchNotifications = async () => {
      const fetchedNotifications = await getAllUserNotificationsRequest();
      // const fetchedNotifications = [
      //   {
      //     id: 1,
      //     message: "User profile updated.",
      //     date: "12-21-2001",
      //     readFlag: true,
      //   },
      //   {
      //     id: 2,
      //     message: "Password changed successfully.",
      //     date: "12-21-2001",
      //     readFlag: false,
      //   },
      //   {
      //     id: 3,
      //     message: "New login from unrecognized device.",
      //     date: "12-21-2001",
      //     readFlag: true,
      //   },
      // ];
      setNotifications(fetchedNotifications);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="maiProfile">
      <div className="userprofileContainer">
        <div className="project-user-profile-profile-header">
          <img
            src={activeUser?.profilePhoto ?? "/imgs/user.png"}
            alt="User Avatar"
            className="project-user-profile-profile-avatar"
          />
          <div className="project-user-profile-profile-info">
            <h2>{activeUser?.username}</h2>
            <p>{activeUser?.email}</p>
            <div className="project-user-profile-photo-buttons">
              <label className="project-user-profile-upload-photo-button">
                Upload Photo
                <input
                  type="file"
                  onChange={handleUpdatePhoto}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="project-user-profile-profile-details">
          <div className="project-user-profile-profile-section">
            <h3>User Account</h3>
            <p>Username: {activeUser?.username}</p>
            <p>Email: {activeUser?.email}</p>
          </div>
          <div className="project-user-profile-profile-section">
            <h3>User Details</h3>
            <p>First Name: {activeUser?.firstName}</p>
            <p>Last Name: {activeUser?.lastName}</p>
            <p>Gender: {activeUser?.gender}</p>
            <p>Age: {activeUser?.age}</p>
          </div>
          <div className="project-user-profile-profile-section">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 4,
                flexWrap: "wrap",
              }}
            >
              <h3>Notifications</h3>
              <button type="button" onClick={handleReadAllNotifications}>
                mark all read
              </button>
            </div>
            <ul>
              {notifications?.map((notification) => (
                <li
                  key={notification.id}
                  onClick={() =>
                    !notification.readFlag &&
                    handleReadNotification(notification.id)
                  }
                  className={notification.readFlag && "read"}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      color: !notification.readFlag ? "green" : "grey",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 4,
                      flexWrap: "wrap",
                      cursor: !notification.readFlag ? "pointer" : "default",
                    }}
                  >
                    <p
                      style={{
                        color: !notification.readFlag ? "green" : "grey",
                        margin: 0,
                      }}
                    >
                      {notification.message}
                    </p>
                    <span>{notification.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleLogout}
            className="project-user-profile-logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
