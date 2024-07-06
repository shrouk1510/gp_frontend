import React, { useState } from 'react';
import './records.css';

const TodoForm = ({ setRecords, setViewTable, setWarningMessage }) => {
    const [type, setType] = useState('');
    const [measurement, setMeasurement] = useState('');
    const [notes, setNotes] = useState(['']);
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const measurementValue = parseFloat(measurement);
        
        if (isNaN(measurementValue)) {
            setWarningMessage('Please enter a valid number for the measurement.');
            return;
        }

        let warning = '';
        if (measurementValue < 70) {
            warning = "Your blood glucose level is low. Consume fast-acting carbohydrates to raise blood sugar quickly. If experiencing symptoms like shakiness, sweating, or confusion, seek medical attention.";
        } else if (measurementValue >= 70 && measurementValue < 100) {
            warning = "Your blood glucose level is within the normal range. If you're diabetic, consult your doctor to see if this is a normal range for you and if any adjustments to medication are needed.";
        } else if (measurementValue >= 100 && measurementValue < 126) {
            warning = "Your blood glucose level indicates prediabetes. Lifestyle changes are crucial to prevent progression. Consider diet modifications, increased physical activity, and regular blood sugar monitoring.";
        } else if (measurementValue >= 126 && measurementValue < 200) {
            warning = "Your blood glucose level is high, especially after fasting. Monitor blood sugar more frequently and contact your doctor to discuss possible medication adjustments.";
        } else if (measurementValue >= 200 && measurementValue < 300) {
            warning = "Your blood glucose level is very high, especially after a meal. Contact your doctor immediately to discuss medication adjustments.";
        } else {
            warning = "Your blood glucose level is dangerously high. Seek immediate medical attention. Do not wait.";
        }

        if (warning) {
            setWarningMessage(warning);
        }

        const newRecord = { type, measurement: measurementValue, notes, date };
        setRecords(prevRecords => [...prevRecords, newRecord]);
        // Reset form fields
        setType('');
        setMeasurement('');
        setNotes(['']);
        setDate('');
        setViewTable(true); // Switch to table view after submission
    };

    const handleNoteChange = (index, value) => {
        const newNotes = [...notes];
        newNotes[index] = value;
        setNotes(newNotes);
    };

    const addNoteField = () => {
        setNotes([...notes, '']);
    };

    const removeNoteField = (index) => {
        const newNotes = notes.filter((_, i) => i !== index);
        setNotes(newNotes);
    };

    return (
        <div className="todo-form-container">
            <div className="headeer">
                <div className="texxt">Upload Glucose Measure</div>
                <div className="underliney"></div>
            </div>
            <form className= "qq" onSubmit={handleSubmit}>
                <div className="form-g">
                    <label htmlFor="measurement">Measurement:</label>
                    <input type="number" id="measurement" value={measurement} onChange={(e) => setMeasurement(e.target.value)} required />
                </div>
                <div className="form-gr">
                    <label htmlFor="notes">Notes:</label>
                    {notes.map((note, index) => (
                        <div key={index} className="note-container">
                            <textarea
                                id={`note-${index}`}
                                value={note}
                                onChange={(e) => handleNoteChange(index, e.target.value)}
                            />
                            <button type="button" onClick={() => removeNoteField(index)} className="remove-note-button"><span role="img" aria-label="bin">🗑️</span></button>
                        </div>
                    ))}
                </div>
                <div className="form-gro">
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <button type="submit" className="submit-record">Upload</button>
            </form>
        </div>
    );
};

export default TodoForm;
