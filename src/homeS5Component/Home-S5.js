import React from 'react';
import './home5.css'

function ShopSection() {
  return (
    <section className="home5shop">
      <div className="home5container">
        <div className="row justify-content-between">
          <div className="col-lg-4">
            <div className="text">
                <i class="bi bi-box-fill">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-fill" viewBox="0 0 16 16">
                     <path fill-rule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001 6.971 2.789Zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"/>
                    </svg>
                </i> 
              <h6>Free Tracking Method</h6>
              <p>track your blood glucose, insuline, vitamines and weight</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="text">
              <i className="fa-sharp fa-solid fa-unlock"></i>
              <h6>Secure Payment System</h6>
              <p>Additional features which require payment is extremely secure</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="text">
              <i className="fa-sharp fa-solid fa-arrows-rotate"></i>
              <h6>Secure Uploading Data</h6>
              <p>Your data you upload is extremely secure too</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopSection;
