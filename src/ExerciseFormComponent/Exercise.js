import React, { useState } from 'react';
import './Exercise.css';

const ExerciseForm = () => {
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
        console.log(formData);
        // Here you can handle the form data, e.g., send it to an API
    };

    return (
        <div className='exerciseContainer'>
            <div className="exercise-form">
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="submit-button">Submit</button>
                </form>
                <div className='exerciseSchedule' >
                    <a href='#'>View Your Schedule</a>
                </div>
            </div>
        </div>
    );
};

export default ExerciseForm;
