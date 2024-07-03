import React from 'react';
import './home4.css';

function Varity() {
  return (
    <section className="home4functions">
      <div className="home4container">
        <div className="text">
          <h2>GlucoGuide functions</h2>
          <p>GlucoGuide enales you in manging your life for better healthy body, avoiding you from any effect from diabetes  <br />Helps to overcome any disease that causes diabetes </p>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="img">
                <img src="imgs/review1.jpg" className="card-img-top" alt="" />
                <i className="fa-solid fa-heart"></i>
                <a href="#" className="hover1">View More</a>
              </div>
              <div className="card-body">
                <h3><a href="#">The Openions Of People On GlucoGuide</a></h3>
                <p>Put Your Own</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="img">
                <img src="imgs/list2.jpg" className="card-img-top img2" alt="" />
                <i className="fa-solid fa-heart"></i>
                <a href="#" className="hover1">View More</a>
              </div>
              <div className="card-body">
                <h3><a href="#">GlocoGuid Enables User Make Their Health Lists</a></h3>
                <p>Make Your Own</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="img">
                <img src="imgs/dia3.jpg" className="card-img-top" alt="" />
                <i className="fa-solid fa-heart"></i>
                <a href="#" className="hover1">View More</a>
              </div>
              <div className="card-body">
                <h3><a href="#">Give You A Tist To Ensure Your Diabetes</a></h3>
                <p>Ensure From Here</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="img">
                <img src="imgs/data.jpg" className="card-img-top img4" alt="" />
                <i className="fa-solid fa-heart"></i>
                <a href="#" className="hover1">View More</a>
              </div>
              <div className="card-body">
                <h3><a href="#">GlocoGuide Tracks Health Data Regularly</a></h3>
                <p>Update Your data</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="img">
                <img src="imgs/loc.jpg" className="card-img-top img4" alt="" />
                <i className="fa-solid fa-heart"></i>
                <a href="#" className="hover1">View More</a>
              </div>
              <div className="card-body">
                <h3><a href="#">GlucoGuide View Locations Of Clinics And Pharmacies</a></h3>
                <p>View Specific Locations</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="img">
                <img src="imgs/graph.jpg" className="card-img-top img4" alt="" />
                <i className="fa-solid fa-heart"></i>
                <a href="#" className="hover1">View More</a>
              </div>
              <div className="card-body">
                <h3><a href="#">GlucoGuide View Graphs For The Tracking Data</a></h3>
                <p>View Your Graph</p>
              </div>
            </div>
          </div>
      
      

          {/* Repeat the above structure for other watches */}
          
        </div>
        <div className="link">
          <a href="#" className="product">view more functions</a>
        </div>
      </div>
    </section>
  );
}

export default Varity;
