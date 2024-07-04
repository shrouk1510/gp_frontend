import React, { useState } from 'react';
import './records.css';

const TodoForm = ({ setRecords, setViewTable }) => {
    const [type, setType] = useState('');
    const [measurement, setMeasurement] = useState('');
    const [notes, setNotes] = useState(['']);
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = { type, measurement, notes, date };
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
                <div className="texxt">Upload Medical Record</div>
                <div className="underliney"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-groupy">
                    <label htmlFor="type">Type:</label>
                    <select id="type" value={type} onChange={(e) => setType(e.target.value)} style={{ width: '97%' }} >
                        <option value="" disabled hidden>Select type</option>
                        <option value="Glucose Measures">Glucose Measures</option>
                        <option value="Insuline Levels">Insuline Levels</option>
                        <option value="Carbohydrate">Carbohydrate</option>
                    </select>
                </div>
                <div className="form-g">
                    <label htmlFor="measurement">Measurement:</label>
                    <input type="text" id="measurement" value={measurement} onChange={(e) => setMeasurement(e.target.value)} required />
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
                    <button type="button" onClick={addNoteField} className="add-note-button">+ Add Note</button>
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
