import React from 'react';
import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import email_icon from '../Assets/email.png';
import './signup.css';

const StepOne = ({ handleChange, handleNext, userData }) => {
    return (
        <div className='ll'>
            <div className="containersign">
                <div className="headersign">
                    <div className="textsign">Sign up</div>
                    <div className="underlinesign"></div>
                </div>
                <div className="inputssign">
                    <div className="inputsign">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Username" name='username' value={userData.username} onChange={handleChange} required />
                    </div>

                    <div className="inputsign">
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder="Email" name='email' value={userData.email} onChange={handleChange} required />
                    </div>

                    <div className="inputsign">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder="Password" name='password' value={userData.password} onChange={handleChange} required />
                    </div>

                </div>

                <button className="next-buttonsign" onClick={handleNext}>Next</button>
            </div>
        </div>
    );

};

export default StepOne;
