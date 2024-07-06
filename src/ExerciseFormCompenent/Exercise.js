import React, { useState } from 'react';
import './Exercise.css';

const ExerciseForm = ({ nextStep, prevStep, setCombinedData }) => {
  const [formData, setFormData] = useState({
    duration: '',
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
    setCombinedData(prevData => [...prevData, { ...formData, type: 'Exercise' }]);
    setFormData({ duration: '', time: '' });
    nextStep();
  };

  return (
    <div className='exerciseContainer'>
      <form onSubmit={handleSubmit} className="exercise-form">
        <div className="form-group">
          <div className="header">
            <div className="text">Exercise Data</div>
            <div className="underline"></div>
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
          <div className="form-group">
            <label htmlFor="duration">Duration (in minutes):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            
            />
          </div>
        </div>
        <button type="button" className="Exerback-button" onClick={prevStep}>Back</button>
        <button type="submit" className="sub-button">Next</button>
      </form>
    </div>
  );
};

export default ExerciseForm;
