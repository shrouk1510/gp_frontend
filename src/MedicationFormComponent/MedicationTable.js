import React from 'react';
import './medication.css';

const MedicationTable = ({ medications, setViewTable }) => {
  return (
    <div className="tableeeContainer">
      <h2>Medication Schedule</h2>
      <table className="medication-table">
        <thead>
          <tr>
            <th>Medication Name</th>
            <th>Dose</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication, index) => (
            <tr key={index}>
              <td>{medication.name}</td>
              <td>{medication.dose}</td>
              <td>{medication.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='medicalbuttonContainer'>
        <button className="medicalBack" onClick={() => setViewTable(false)}>Back to Form</button>
      </div>
    </div>
  );
};

export default MedicationTable;
