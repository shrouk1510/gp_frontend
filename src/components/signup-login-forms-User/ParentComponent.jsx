// ParentComponent.js
import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import "./signup.css";
import { useAuthContext } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ParentComponent = () => {
  const { createUserData } = useAuthContext();

  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    gender: undefined,
    age: undefined,
  });

  const navigate = useNavigate();
  const handleNext = () => {
    if (userData.username && userData.email && userData.password) {
      setStep(step + 1);
    } else {
      // Notify user to fill in all required fields
      toast.error("Please fill in all required fields.");
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    // Check if all required fields are filled
    if (
      userData.firstname &&
      userData.lastname &&
      userData.gender &&
      userData.age
    ) {
      // Logic to submit user data
      // console.log("User data submitted:", userData);

      try {
        const formattedValues = {
          username: userData.username,
          password: userData.password,
          email: userData.email,
          details: {
            firstName: userData.firstname,
            lastName: userData.lastname,
            gender: userData.gender,
            age: Number(userData.age),
          },
        };

        console.log("User data submitted:", formattedValues);
        await createUserData(formattedValues);

        navigate("/Sign-In");
      } catch (error) {
        typeof error === "string" ? toast.error(error) : alert(error);
      }
    } else {
      // Notify user to fill in all required fields
      toast.error("Please fill in all required fields.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      {step === 1 && (
        <StepOne
          handleChange={handleChange}
          handleNext={handleNext}
          userData={userData}
        />
      )}
      {step === 2 && (
        <StepTwo
          handleChange={handleChange}
          handlePrevious={handlePrevious}
          handleSubmit={handleSubmit}
          userData={userData}
        />
      )}
    </div>
  );
};

export default ParentComponent;
