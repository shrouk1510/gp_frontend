import React, { useState } from 'react';
import './AdminProfile.css';
import {Link} from 'react-router-dom'

const AdminProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [admin, setAdmin] = useState({
        username: 'admin22',
        password: '',
        email: 'admin2@example.com',
    });
    const [errors, setErrors] = useState({});

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    };

    const handleSaveClick = () => {
        if (validateForm()) {
            setIsEditing(false);
            console.log('Admin details saved:', admin);
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

    return (
        <div className="react-admin-admin-profile-container">
            <div className="react-admin-profile-header">
                <div className="react-admin-profile-info">
                    <h2>{admin.username}</h2>
                    <p>{admin.email}</p>
                </div>
                <button onClick={isEditing ? handleSaveClick : handleEditClick} className="react-admin-edit-button">
                    {isEditing ? 'Save' : 'Edit'}
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
                                className={errors.username ? 'input-error' : ''}
                            />
                        ) : (
                            <span>{admin.username}</span>
                        )}
                        {errors.username && <p className="react-admin--error">{errors.username}</p>}
                    </label>
                    {isEditing && (
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={admin.password}
                                onChange={handleChange}
                                className={errors.password ? 'input-error' : ''}
                            />
                            {errors.password && <p className="react-admin-error">{errors.password}</p>}
                        </label>
                    )}
                </div>
                <Link to='/AdminLogout' className="react-admin-logout-button">Logout</Link>
            </div>
        </div>
    );
};

export default AdminProfile;
