import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './home1.css'

function MainSection() {
  return (
    <section className="main2">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-8">
            <div className="text">
              <h1>Select Your New Perfect Life</h1>
              <p>Its your time to manage your Health using your Assistant GlucoGuide Application.</p>
              <p>Sign Up to see more </p>
              
            </div>
          </div>
          <div className="col-lg-4">
            <div className="img">
              <img src="imgs/cover.webp" alt="Cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainSection;
