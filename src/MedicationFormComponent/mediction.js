import React, { useState } from 'react';
import './medication.css';

const MedicationForm = ({ nextStep, handleViewSchedule, setCombinedData }) => {
  const [formData, setFormData] = useState({
    name: '',
    dose: '',
    time: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCombinedData(prevData => [...prevData, { ...formData, type: 'Medication' }]);
    setFormData({ name: '', dose: '', time: '' });
    nextStep();
  };

  return (
    <div className='medicationContainer'>
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
            
            />
          </div>
        </div>
        <button type="submit" className="subb-button">Next</button>
      </form>
      <div className='medicalSchedule'>
        <button className="see" onClick={handleViewSchedule}>View Your Schedule</button>
      </div>
    </div>
  );
};

export default MedicationForm;
