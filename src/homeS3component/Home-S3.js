import React from 'react';
import './home.css'

function Locations() {
  return (
    <section className="Location">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="cover1"><img src="imgs/photo4.jpeg" alt="Watch 1" /></div>
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12">
          <div className="cover2"><img src="imgs/photo4.jpg" alt="Watch 2" /></div>
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12">
          <div className="cover3"><img src="imgs/photo5.jpg" alt="Watch 3" /></div>
          <div className="cover4"><img src="imgs/photo6.jpg" alt="Watch 4" /></div>
        </div>
      </div>
    </section>
  );
}

export default Locations;
