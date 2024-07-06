import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registered.css';

function RegisteredNav() {
  const [showSearchField, setShowSearchField] = useState(false);

  const handleSearchIconClick = () => {
    setShowSearchField(!showSearchField);
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
                  <Link to='/reviewsB' className="nav-link">Reviews</Link>
                </li>
                <li className="nav-item dropdown nature">
                  <a className="nav-link" href="#">Articles</a>
                  <ul className="item-menu">
                    <Link to='/NewNat'><li>Natural Tips</li></Link>
                    <Link to='/userlifestyle'><li>Lifestyle Tips</li></Link>
                  </ul>
                </li>
                <li className="nav-item dropdown nature">
                  <Link to='/UploadData' className="nav-link">Records</Link>
                </li>
                <li className="nav-item dropdown nature">
                  <Link to='/MedicationL' className="nav-link">Health Lists</Link>
                </li>
                <li className="nav-item">
                  <Link to='/predict' className="nav-link">Predict diabetes</Link>
                </li>
                <li className="nav-item">
                  <Link to='/graph' className="nav-link">graphs</Link>
                </li>
                <li className="nav-item">
                  <Link to='/Location' className="nav-link">Locations</Link>
                </li>
              </ul>
            </div>
            <div className="icons">
              <Link className="icon1" onClick={handleSearchIconClick}>
                <span className="material-symbols-outlined">search</span>
              </Link>
              <Link to="/userprofile" className="icon1"><span className="material-symbols-outlined">person</span></Link>
              <Link to="/logout" className="icon2"><span className="material-symbols-outlined">logout</span></Link>
            </div>
          </div>
        </div>
      </nav>
      {showSearchField && (
        <div className="search-field-container">
          <input type="text" className="form-control search-field" placeholder="Type your search..." />
        </div>
      )}
    </header>
  );
}

export default RegisteredNav;
