import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './choose.css'






const ChoosePage = () => {
  return (
    <div className="choose-page">
      <div className="choose-page-content">
        <h1 className="choose-page-title">Welcome To GlucoGuide App</h1>
        <p className="choose-page-subtitle">Are You an admin or a user</p>
        <div className="choose-page-buttons">
          <Link to="/user" className="choose-page-btn choose-page-user-btn">User</Link>
          <Link to="/admin" className="choose-page-btn choose-page-admin-btn">Admin</Link>
        </div>
      </div>
    </div>
  );
}

export default ChoosePage;
