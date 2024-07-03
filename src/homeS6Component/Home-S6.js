import React from 'react';
import './home6.css'

function ContactFooter() {
  return (
    <footer className="home6contact">
      <div className="home6container">
        <div className="row justify-content-between">
          <div className="col-lg-3">
            <a href="#">
              <img src="imgs/logo3.jpg" alt="Cover" />
            </a>
            <p>Application Built for your healthy and manage your life successfully</p>
          </div>
          <div className="col-lg-3">
            <div className="home6text text1">
              <h4>Quick Links</h4>
              <a href="#">About</a>
              <a href="#">Offers & Discount</a>
              <a href="#">Get Coupon</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="home6text">
              <h4>Few Functions</h4>
              <a href="#">Locations</a>
              <a href="#">Track Diabetes</a>
              <a href="#">Update Data</a>
              <a href="#">Make Lists</a>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="home6text">
              <h4>Support</h4>
              <a href="#">Frequently Asked Question</a>
              <a href="#">Terms & Condition</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Report a Payment Issue</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ContactFooter;
