import React, { useState, useEffect } from "react";
import './SignupForm.css';
import user_icon from './Assets/person.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';

const Tooltip = ({ message }) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(!!message);
    }, [message]);

    return (
        <div className={`SignupForm-tooltip ${isActive ? 'active' : ''}`}>
            {message}
        </div>
    );
};

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ username: "", email: "", password: "" });

    const handleSignup = () => {
        let valid = true;
        const errorObj = { username: "", email: "", password: "" };

        if (!username.trim()) {
            errorObj.username = "Username is required";
            valid = false;
        }

        if (!email.trim()) {
            errorObj.email = "Email is required";
            valid = false;
        }

        if (!password.trim()) {
            errorObj.password = "Password is required";
            valid = false;
        }

        setError(errorObj);

        if (valid) {
            console.log("Sign up successful");
        }
    };

    return (
        <div className="SignupForm-signup-container">
            <div className="SignupForm-form-container">
                <div className="SignupForm-header">
                    <div className="SignupForm-text">Sign Up</div>
                    <div className="SignupForm-underline"></div>
                </div>

                <div className="SignupForm-inputs">
                    <div className="SignupForm-input-container">
                        <div className="SignupForm-input">
                            <img src={user_icon} alt="user icon" />
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {error.username && <Tooltip message={error.username} />}
                    </div>
                    <div className="SignupForm-input-container">
                        <div className="SignupForm-input">
                            <img src={email_icon} alt="email icon" />
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {error.email && <Tooltip message={error.email} />}
                    </div>
                    <div className="SignupForm-input-container">
                        <div className="SignupForm-input">
                            <img src={password_icon} alt="password icon" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error.password && <Tooltip message={error.password} />}
                    </div>
                </div>
                <div className="SignupForm-submit-container">
                    <div className="SignupForm-submit" onClick={handleSignup}>
                        Sign Up
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
