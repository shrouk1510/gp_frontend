import React from 'react';
import './UnifiedTable.css';

const UnifiedTable = ({ combinedData, setViewTable }) => {
  return (
    <div className='tableContainer'>
      <h2>Health Data Schedule</h2>
      <table className="unified-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Dose</th>
            <th>Duration</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((data, index) => (
            <tr key={index}>
              <td>{data.type}</td>
              <td>{data.name || '-'}</td>
              <td>{data.dose || '-'}</td>
              <td>{data.duration || '-'}</td>
              <td>{data.time || '-'}</td>
              <td>
                <button className="update-button">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='buttonContainer'>
        <button className="backButton" onClick={() => setViewTable(false)}>Back to Form</button>
      </div>
    </div>
  );
};

export default UnifiedTable;
