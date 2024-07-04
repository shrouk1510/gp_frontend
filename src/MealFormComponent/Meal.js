import React, { useState } from 'react'; 
import './Meal.css'; 
 
const MealForm = ({ setMeals, setViewTable }) => { 
  const [formData, setFormData] = useState({ 
    name: '', 
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
    setMeals(prevMeals => [...prevMeals, formData]); 
    setFormData({ name: '', time: '' }); 
  }; 
 
  const handleViewSchedule = () => { 
    setViewTable(true); 
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
            <label htmlFor="name">Meal Name:</label> 
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
        <button type="submit" className="submit-button">Submit</button> 
      </form> 
      <div className='mealSchedule'> 
        <button onClick={handleViewSchedule}>View Your Schedule</button> 
      </div> 
    </div> 
  ); 
}; 
 
export default MealForm;