import React, { useState } from "react";
import "./medication.css";

const MedicationForm = ({ setMedications, setViewTable }) => {
  const [formData, setFormData] = useState({
    name: "",
    dose: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMedications((prevMedications) => [...prevMedications, formData]);
    setFormData({ name: "", dose: "", time: "" });
  };

  const handleViewSchedule = () => {
    setViewTable(true);
  };

  return (
    <div className="medicationContainer">
      <form onSubmit={handleSubmit} className="medication-form">
        <div className="form-group">
          <div className="header">
            <div className="text">Medication Data</div>
            <div className="underline"></div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Medication Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dose">Dose:</label>
            <input
              type="text"
              id="dose"
              name="dose"
              value={formData.dose}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="subb-button">
          Submit
        </button>
      </form>
      <div className="medicalSchedule">
        <button className="see" onClick={handleViewSchedule}>
          View Your Schedule
        </button>
      </div>
    </div>
  );
};

export default MedicationForm;
