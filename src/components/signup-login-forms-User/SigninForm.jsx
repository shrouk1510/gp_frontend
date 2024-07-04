import React, { useState, useEffect } from "react";

import "./signin.css";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import { useAuthContext } from "../../contexts/auth-context";

const Tooltip = ({ message }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(!!message);
  }, [message]);

  return <div className={`tooltip ${isActive ? "active" : ""}`}>{message}</div>;
};

const SigninForm = () => {
  const { loginUser } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    let valid = true;
    const errorObj = { username: "", password: "" };

    if (!username.trim()) {
      errorObj.username = "Username is required";
      valid = false;
    }

    if (!password.trim()) {
      errorObj.password = "Password is required";
      valid = false;
    }

    setError(errorObj);

    if (valid) {
      setIsLoggedIn(true);
      try {
        await loginUser(username, password);
        navigate("/Registered");
      } catch (error) {
        // alert(error);
      }
    }
  };

  // const AdminProfile = () => (
  //     <div className="admin-profile">
  //         <div className="profile-container">
  //             <div className="admin-profile-text">Admin Profile</div>
  //             <div>Username:</div>
  //             <div>Email:</div>
  //             <div className="profile-buttons">
  //                 <button>Update Profile</button>
  //                 <button>Delete Account</button>
  //                 <button>Log Out</button>
  //             </div>
  //             <Link to="/glucose-data-graph">Go to Glucose Data Graph</Link> {/* Add link to glucose data graph */}
  //         </div>
  //     </div>
  // );

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSignIn}>
        <div className="header">
          <div className="text">Sign In</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input-container">
            <div className="input username">
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

          <div className="input-container">
            <div className="input">
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

        <div className="submit-container">
          <button className="submit" type="submit">
            Sign In
          </button>
        </div>
        <div className="link-container">
          Don't have an account?
          <Link to="/UrgentSign" className="link">
            {" "}
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
