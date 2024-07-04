import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import {Link} from 'react-router-dom'

const UserProfile = () => {
    const [user, setUser] = useState({
        username: 'Abdullah123',
        email: 'Abdullah123@example.com',
        firstName: 'Abdullah',
        lastName: 'Mahmoud',
        gender: 'Male',
        age: 22,
        profilePhoto: 'https://via.placeholder.com/100' // Placeholder image
    });
    const [notifications, setNotifications] = useState([]);
    const [errors, setErrors] = useState({});

    const handleUpdatePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser({ ...user, profilePhoto: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            const fetchedNotifications = [
                { id: 1, message: 'User profile updated.' },
                { id: 2, message: 'Password changed successfully.' },
                { id: 3, message: 'New login from unrecognized device.' },
            ];
            setNotifications(fetchedNotifications);
        };

        fetchNotifications();
    }, []);

    return (
        <div className='maiProfile'>
            <div className="userprofileContainer">
                <div className="project-user-profile-profile-header">
                    <img src={user.profilePhoto} alt="User Avatar" className="project-user-profile-profile-avatar" />
                    <div className="project-user-profile-profile-info">
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                        <div className="project-user-profile-photo-buttons">
                            <label className="project-user-profile-upload-photo-button">
                                Upload Photo
                                <input type="file" onChange={handleUpdatePhoto} style={{ display: 'none' }} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="project-user-profile-profile-details">
                    <div className="project-user-profile-profile-section">
                        <h3>User Account</h3>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                    </div>
                    <div className="project-user-profile-profile-section">
                        <h3>User Details</h3>
                        <p>First Name: {user.firstName}</p>
                        <p>Last Name: {user.lastName}</p>
                        <p>Gender: {user.gender}</p>
                        <p>Age: {user.age}</p>
                    </div>
                    <div className="project-user-profile-profile-section">
                        <h3>Notifications</h3>
                        <ul>
                            {notifications.map(notification => (
                                <li key={notification.id}>{notification.message}</li>
                            ))}
                        </ul>
                    </div>
                    <Link to='/ProfileLogout' className="project-user-profile-logout-button">Logout</Link>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
