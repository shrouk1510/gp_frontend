import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import './Registered.css'
import { useAuthContext } from '../contexts/auth-context';


function RegisteredNav() {
  const { activeUser, logoutUser, logoutAdmin, updateUser, role } =
    useAuthContext();

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

                <li className="nav-item">
                  <Link to='/reviewsB' className="nav-link" href="#">Reviews</Link>
                </li>
                <li className="nav-item dropdown nature">
                  <a className="nav-link" href="#">
                    Articles
                  </a>
                  <ul className="item-menu">
                    <Link to='/NewNat' href="#"><li>Natural Tips</li></Link>
                    <Link to='/userlifestyle' href="#"><li>Lifestyle Tips</li></Link>
                  </ul>
                </li>
                <li className="nav-item dropdown nature">
                  <Link to='/UploadData' className="nav-link" href="#">
                    Records
                  </Link>
                </li>
                <li className="nav-item dropdown nature">
                  <a className="nav-link" href="#">
                    Health Lists
                  </a>
                  <ul className="item-menu newList">
                    <Link to='/MedicationL' href="#"><li>Medication Schedule</li></Link>
                    <Link to='/excercize' href="#"><li>Exercise Schedule</li></Link>
                    <Link to='/meal' href="#"><li>Meal Schedule </li></Link>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to='/predict' className="nav-link" href="diabetes-level-reports.html">Predict diabetes</Link>
                </li>
                <li className="nav-item">
                  <Link to='/graph' className="nav-link" href="#">graphs</Link>
                </li>
                <li className="nav-item">
                  <Link to='/Location' className="nav-link" href="diabetes-level-reports.html">Locations</Link>
                </li>
              </ul>
            </div>
            <div className="icons">
              <Link to="/userprofile" className="icon1" href="Sign-up.html"><span className="material-symbols-outlined">person</span></Link>
              <button className="icon2" onClick={handleLogout}><span className="material-symbols-outlined">logout</span></button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}


export default RegisteredNav;
