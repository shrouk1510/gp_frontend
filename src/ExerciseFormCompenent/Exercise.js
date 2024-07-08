import React, { useState } from 'react';
import './Exercise.css';

const ExerciseForm = ({ nextStep, prevStep, setCombinedData }) => {
  const [formData, setFormData] = useState({
    exerciseName: '',
    duration: '',
    time: '',
    date: new Date().toISOString().split('T')[0] // Set the default date to today's date
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
    if (formData.exerciseName || formData.duration || formData.time) {
      setCombinedData(prevData => [...prevData, { ...formData, type: 'Exercise' }]);
    }
    setFormData({ exerciseName: '', duration: '', time: '', date: new Date().toISOString().split('T')[0] }); // Reset date field as well
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
            <label htmlFor="exerciseName">Exercise Name:</label>
            <input
              type="text"
              id="exerciseName"
              name="exerciseName"
              value={formData.exerciseName}
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
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
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
