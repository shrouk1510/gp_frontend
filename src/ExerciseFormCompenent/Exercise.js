import React, { useState } from 'react'; 
import './Exercise.css'; 
 
const ExerciseForm = ({ setExercises, setViewTable }) => { 
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
    setExercises(prevExercises => [...prevExercises, formData]); 
    setFormData({ duration: '', time: '' }); 
  }; 
 
  const handleViewSchedule = () => { 
    setViewTable(true); 
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
              required 
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
              required 
            /> 
          </div> 
        </div> 
        <button type="submit" className="sub-button">Submit</button> 
      </form> 
      <div className='exerciseSchedule'> 
 
        <button className= "view" onClick={handleViewSchedule}>View Your Schedule</button> 
      </div> 
    </div> 
  ); 
}; 


export default ExerciseForm;