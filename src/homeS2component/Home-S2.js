import React from 'react';
import './home2.css'

function NewArrivals() {
  return (
    <section className="new">
      <div className="home1container">
        <h2>Lifestyle Recommendations:</h2>
        <div className="row align-items-center">
          <div className="col-lg-4">
            <div className="card">
              <div className="img">
                <img src="imgs/photo1.jpg" className="card-img-top" alt="Photo 1" />
              </div>
              <div className="card-body">
                <h3><a href="#">Tips From Nature For you </a></h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="img">
                <img src="imgs/photo2.jpg" className="card-img-top" alt="Photo 2" />
              </div>
              <div className="card-body">
                <h3><a href="#">Tips For better Lifestyle</a></h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="img Simg">
                <img src="imgs/photo3.jpg" className="card-img-top" alt="Photo 3" />
              </div>
              <div className="card-body">
                <h3><a href="#">Reports for Diabetes</a></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
