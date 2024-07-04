import React, { useState } from 'react';
import './DeleteAdmin.css';

const DeleteAdmin = () => {
    const [username, setUsername] = useState('');
    const [confirm, setConfirm] = useState(false);

    const handleDelete = (e) => {
        e.preventDefault();
        if (username) {
            setConfirm(true);
        } else {
            alert('Please enter a username');
        }
    };

    const confirmDelete = () => {
        // Handle the delete admin logic here, e.g., making an API call
        console.log(`Deleting admin: ${username}`);
        // Reset the form
        setUsername('');
        setConfirm(false);
    };

    const cancelDelete = () => {
        setConfirm(false);
    };

    return (
        <div className="admin-delete-admin-container">
            <h2>Delete Admin</h2>
            <form onSubmit={handleDelete} className="admin-delete-admin-form">
                <label htmlFor="username">Admin Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    required
                />
                <button type="submit">Delete</button>
            </form>
            {confirm && (
                <div className="admin-confirm-message">
                    <p>Are you sure you want to delete admin: {username}</p>
                    <button onClick={confirmDelete}>Yes</button>
                    <button onClick={cancelDelete}>No</button>
                </div>
            )}
        </div>
    );
};

export default DeleteAdmin;
