import React, { useState } from 'react';
import './Meal.css';

const MealForm = ({ prevStep, handleSubmitAll }) => {
  const [formData, setFormData] = useState({
    name: '',
    time: ''
  });

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitAll({ ...formData, type: 'Meal' });
    setFormData({ name: '', time: '' });
  };

  return (
    <div className='mealContainer'>
      <form onSubmit={handleSubmit} className="meal-form">
        <div className="form-group">
          <div className="header">
            <div className="text">Meal Data</div>
            <div className="underline"></div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Meal Type:</label>
            <select
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            >
              <option value="" disabled>Select a meal type</option>
              {mealTypes.map((mealType) => (
                <option key={mealType} value={mealType}>{mealType}</option>
              ))}
            </select>
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
        <button type="button" className="mealback-button" onClick={prevStep}>Back</button>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default MealForm;
