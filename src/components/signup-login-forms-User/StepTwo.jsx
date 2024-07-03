import React from 'react';
import './signup.css';

const StepTwo = ({ handleChange, userData, handlePrevious, handleSubmit }) => {

    return (
        <div className="container1sign">
            <div className="headersign">
            <div className="textsign">Complete Your Registeration</div>
            <div className="underlinesign"></div>
            </div>

            <div className="inputssign">
                <div className="inputsig inputsign">
                    <input type="text" placeholder="First Name" value={userData.firstname} onChange={handleChange} required/>
                </div>

                <div className="inputsig inputsign">
                    <input type="text" placeholder="Last Name" value={userData.lastname} onChange={handleChange} required/>
                </div>

                <div className="inputsig inputsign">
                    <input type="text" placeholder="Gender" value={userData.gender} onChange={handleChange} required/>
                </div>

                <div className="inputsig inputsign">
                    <input type="number" placeholder="Age" name="age" value={userData.age} onChange={handleChange} min="0" max="150" required/>
                </div>

                <div className="inputsig inputsign">
                    <input type="text" placeholder="Photo Path" value={userData.photopath} onChange={handleChange} />
                </div>
            </div>
            <div className="buttons-containersign">
            <button className="previous-buttonsign" onClick={handlePrevious}>Previous</button>
            <button className="submit-buttonsign" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default StepTwo;
