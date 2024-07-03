import React, { useState } from 'react';
import './Meal.css';

const MealForm = () => {
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
        console.log(formData);
        // Here you can handle the form data, e.g., send it to an API
    };

    return (
        <div className='mealContainer'>

            <div className="meal-form">

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="header">
                            <div className="text">Meal Data</div>
                            <div className="underline"></div>
                        </div>
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
                    <button type="submit" className="submit-button">Submit</button>
                </form>
                <div className='mealSchedule' >
                    <a href='#'>View Your Schedule</a>
                </div>
            </div>
        </div>
    );
};

export default MealForm;
