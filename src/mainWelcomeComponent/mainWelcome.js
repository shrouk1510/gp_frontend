import './welcome.css'

function MainSection() {
  return (
    <section className="mainWelcomemain">
      <div className="mainWelcomcontainer">
        <div className="row text-all align-item-center">
          <div className="col-lg-8 align-item-center">
            <div className="maintext">
              <h1>Created for a better healthy life</h1>
              <p>Welcome To GlucoGuide, we will provide you with various information, lifestyle, and methods to cope with diabetes in the right way and know what your body needs</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="img">
              <img src="imgs/d5.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainSection;