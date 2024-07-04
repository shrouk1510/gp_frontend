import React from 'react';
import './records.css';

const TodoTable = ({ records, setViewTable }) => {
    return (
        <div className="table-container">
            <h2>Medical Records</h2>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Measurement</th>
                        <th>Notes</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td>{record.type}</td>
                            <td>{record.measurement}</td>
                            <td>
                                <ul>
                                    {record.notes.map((note, i) => (
                                        <li key={i}>{note}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>{record.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="back-button" onClick={() => setViewTable(false)}>Back to Form</button>
        </div>
    );
};

export default TodoTable;
