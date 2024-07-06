import React, { useState } from "react";
import "./AdminProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";
import toast from "react-hot-toast";
import { updateAdminRequest } from "../lib/api/user";

const AdminProfile = () => {
  const { activeUser, logoutAdmin } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [admin, setAdmin] = useState({
    username: activeUser.username,
    password: activeUser.password,
    email: activeUser.email,
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSaveClick = async () => {
    if (validateForm()) {
      try {
        await updateAdminRequest({
          username: admin.username,
          password: admin.password,
          email: admin.email,
        });

        setIsEditing(false);
        toast.success("admin updated");
      } catch (error) {
        typeof error === "string" ? toast.success(error) : alert(error);
      }
      //   console.log("Admin details saved:", admin);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!admin.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!admin.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      toast.success("admin logout");
      navigate("/");
    } catch (error) {
      typeof error === "string" ? toast.success(error) : alert(error);
    }
  };
  return (
    <div className="react-admin-admin-profile-container">
      <div className="react-admin-profile-header">
        <div className="react-admin-profile-info">
          <h2>{admin.username}</h2>
          <p>{admin.email}</p>
        </div>
        <button
          onClick={isEditing ? handleSaveClick : handleEditClick}
          className="react-admin-edit-button"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="react-admin-profile-details">
        <div className="react-admin-profile-section">
          <h3>Admin Account</h3>
          <label>
            Username:
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={admin.username}
                onChange={handleChange}
                className={errors.username ? "input-error" : ""}
              />
            ) : (
              <span>{admin.username}</span>
            )}
            {errors.username && (
              <p className="react-admin--error">{errors.username}</p>
            )}
          </label>
          {isEditing && (
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <p className="react-admin-error">{errors.password}</p>
              )}
            </label>
          )}
        </div>
        <button onClick={handleLogout} className="react-admin-logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
