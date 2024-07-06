import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminNav.css'
import toast from 'react-hot-toast';
import { useAuthContext } from '../contexts/auth-context';


function AdminNav() {
  const { logoutAdmin, logoutUser, role } = useAuthContext()

  const navigate = useNavigate()

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
  return (

    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="Home.html"><img className="img" src="imgs/logo3.jpg" alt="" /></a>
          <button className="navbar-toggler bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon Building"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="links collapse_ul bg-success">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item space">
                  <Link to='/AdminReview' className="nav-link" href="#">Reviews</Link>
                </li>
                <li className="nav-item dropdown nature space">
                  <a className="nav-link" href="#">
                    Post Articles
                  </a>
                  <ul className="item-menu">
                    <li><Link to='/NatTips' href="#">Natural Tips</Link></li>
                    <li><Link to='/AdminLifestyle' href="#">Lifestyle Tips</Link></li>

                  </ul>
                </li>
                <li className="nav-item home space">
                  <Link to="/addAdmin" className="nav-link" >Add Admin</Link>
                </li>
                <li className="nav-item space">
                  <Link to='/delete' className="nav-link" href="#">Delete Admin</Link>
                </li>
              </ul>
            </div>
            <div className="icons">
              <Link to="/profile" className="icon1" href="Sign-up.html"><span class="material-symbols-outlined">person</span></Link>
              <div className="icon2" href="Sign-in.html" style={{ display: "inline-block", cursor: "pointer" }} onClick={handleLogout}><span class="material-symbols-outlined">logout</span></div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}


export default AdminNav;
