import React from "react";
import "./signup.css";
import { Link } from "react-router-dom";

const StepTwo = ({ handleChange, userData, handlePrevious, handleSubmit }) => {
  return (
  <div className="ll">
    <div className="container1sign">
      <div className="headersign">
        <div className="textsign">Complete Your Registration</div>
        <div className="underlinesign"></div>
      </div>

      <div className="inputssign">
        <div className="inputsig inputsign">
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputsig inputsign">
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputsig inputsign">
          <select
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled selected hidden>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="inputsig inputsign">
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={userData.age}
            onChange={handleChange}
            min="0"
            max="150"
            inputMode="numeric"
            required
          />
        </div>
      </div>

      <div className="buttons-containersign">
        <button className="previous-buttonsign" onClick={handlePrevious}>
          Previous
        </button>
        <button className="submit-buttonsign" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  </div>
  );
};

export default StepTwo;
