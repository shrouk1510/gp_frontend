import React from "react";
import "./records.css";

const TodoTable = ({ records, setViewTable, warningMessage }) => {
  const isNormalRange =
    warningMessage && warningMessage.includes("within the normal range");

  return (
    <div className="table-container">
      <h2>Medical Records</h2>
      {warningMessage && (
        <div
          className={`glucose-message ${
            isNormalRange ? "normal-range" : "abnormal-range"
          }`}
        >
          {warningMessage}
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Measurement</th>
            <th>Notes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records?.map((record, index) => (
            <tr key={index}>
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
      <button className="back-button" onClick={() => setViewTable(false)}>
        Back to Form
      </button>
    </div>
  );
};

export default TodoTable;
