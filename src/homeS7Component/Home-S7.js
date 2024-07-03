import React from 'react';
import './home7.css'

function Footer() {
  return (
    <footer className="home6footer">
      <div className="home7container">
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <div className="home6text">
              <div className="row">
                <p>©2024 All rights reserved | This App is made with <i className="fa-sharp fa-solid fa-heart"></i> by </p>
                <a href="#"> GlocoGuide Team.</a>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="icons">
              <a href="home.html"><i className="fa-brands fa-twitter"></i></a>
              <a href="home.html"><i className="fa-brands fa-facebook"></i></a>
              <a href="home.html"><i className="fa-brands fa-behance"></i></a>
              <a href="home.html"><i className="fa-sharp fa-solid fa-globe"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
