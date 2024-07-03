import React, { useState } from 'react';
import './Mstyle.css'


function Medicalbody() {
  const [medicalRecords, setMedicalRecords] = useState([
    {
      recordId: '1',
      date: '2023-06-20',
      recordType: { typeId: '1', type: 'Blood Test' },
      measurements: '120/80',
      note: 'Normal',
    },
    {
      recordId: '2',
      date: '2023-06-21',
      recordType: { typeId: '2', type: 'X-ray' },
      measurements: 'N/A',
      note: 'Fracture in left arm',
    },
    
  ]);

  const [recordTypes, setRecordTypes] = useState([
    { typeId: '1', type: 'Blood Test' },
    { typeId: '2', type: 'X-ray' },
    { typeId: '3', type: 'MRI' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({
    recordId: '',
    recordType: { typeId: '', type: '' },
    measurements: '',
    note: '',
    date: '',
  });

  const handleUpdateClick = (recordId) => {
    const record = medicalRecords.find(record => record.recordId === recordId);
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedRecord({
      recordId: '',
      recordType: { typeId: '', type: '' },
      measurements: '',
      note: '',
      date: '',
    });
  };

  const handleDeleteClick = (recordId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      console.log(`Deleting record with ID ${recordId}`);
      setMedicalRecords(medicalRecords.filter(record => record.recordId !== recordId));
    }
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    console.log('Updating record', selectedRecord);
    handleCloseModal();
  };

  return (
    <div className="MLBodyApp">
      <h2>Medical Record List</h2>
      <table>
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Date</th>
            <th>Record Type</th>
            <th>Measurements</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {medicalRecords.map(record => (
            <tr key={record.recordId}>
              <td>{record.recordId}</td>
              <td>{record.date}</td>
              <td>{record.recordType.type}</td>
              <td>{record.measurements}</td>
              <td>{record.note}</td>
              <td>
                <button className="update-btn" onClick={() => handleUpdateClick(record.recordId)}>Update</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(record.recordId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div id="updateModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h3>Update Medical Record</h3>
            <form id="updateForm" onSubmit={handleUpdateSubmit}>
              <input type="hidden" name="recordId" value={selectedRecord.recordId} />
              <label>
                Record Type:
                <select
                  value={selectedRecord.recordType.typeId}
                  onChange={(e) => setSelectedRecord({ ...selectedRecord, recordType: { ...selectedRecord.recordType, typeId: e.target.value } })}
                >
                  {recordTypes.map(type => (
                    <option key={type.typeId} value={type.typeId}>{type.type}</option>
                  ))}
                </select>
              </label>
              <label>
                Measurements:
                <input
                  type="text"
                  value={selectedRecord.measurements}
                  onChange={(e) => setSelectedRecord({ ...selectedRecord, measurements: e.target.value })}
                />
              </label>
              <label>
                Note:
                <input
                  type="text"
                  value={selectedRecord.note}
                  onChange={(e) => setSelectedRecord({ ...selectedRecord, note: e.target.value })}
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  value={selectedRecord.date}
                  onChange={(e) => setSelectedRecord({ ...selectedRecord, date: e.target.value })}
                />
              </label>
              <button type="submit">Update Record</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Medicalbody;
