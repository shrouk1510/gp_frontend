// ParentComponent.js
import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import "./signup.css";
import { useAuthContext } from "../../contexts/auth-context";

const ParentComponent = () => {
  const { createUserData } = useAuthContext();

  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    additionalInfo: "",
  });

  const handleNext = () => {
    setStep(step + 1);
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
      console.log("User data submitted:", userData);

      try {
        await createUserData(userData);
      } catch (error) {
        alert(error);
      }
    } else {
      // Notify user to fill in all required fields
      alert("Please fill in all required fields.");
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
