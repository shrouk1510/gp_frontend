import React, { useEffect, useMemo, useState } from 'react';
import './UnifiedTable.css';
import { useDailyListStore } from '../hooks/use-daily-list-store';
import { useModal } from '../hooks/use-modal-store';
import toast from 'react-hot-toast';

const UnifiedTable = ({ handleUpdate }) => {
  const { meals, medications, exercises } = useDailyListStore()
  const { onOpen } = useModal()
  const [dailyListType, setDailyListType] = useState('')
  const [combinedData, setCombinedData] = useState([])

  // const combinedData = useMemo(() => combinDailyList(meals, medications, exercises), [meals, medications, exercises])

  const handleAdd = () => {
    switch (dailyListType) {
      case 'Meal':
        // setMeal(dailyList)
        onOpen("meal")
        break
      case 'Medication':
        onOpen("medication")
        break
      case 'Exercise':
        onOpen("exercise")
        break
      default:
        toast.error('Select daily list type first !!')
    }
  }

  useEffect(() => {
    // console.log('eeee')
    const result = combinDailyList(meals, medications, exercises)
    setCombinedData(result)
  }, [meals, medications, exercises])

  return (
    <div className='tableContainer'>
      <div className='add-form'>
        <select value={dailyListType} onChange={(e) => setDailyListType(e.target.value)}>
          <option value="">Select type</option>
          <option value="Medication">Medication</option>
          <option value="Exercise">Exercise</option>
          <option value="Meal">Meal</option>
        </select>
        <button type='button' className='backButton' onClick={handleAdd}>add</button>
      </div>
      <h2>Health Data Schedule</h2>
      <table className="unified-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Dose</th>
            <th>Duration (minutes)</th>
            <th>Time</th>
            {/* <th>Date</th>  */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.length > 0 ? combinedData.map((data, index) => (
            <tr key={index}>
              <td>{data.type}</td>
              <td>{data.name || '-'}</td>
              <td>{data.dosage || '-'}</td>
              <td>{data.durationMinutes || '-'}</td>
              <td>{data.time || '-'}</td>
              {/* <td>{data.date || '-'}</td>  */}
              <td>
                <button className="update-button" onClick={() => handleUpdate(data, data.type)}>Update</button>
              </td>
            </tr>
          )) : <tr><td colSpan={"6"}>no daily list found</td></tr>}
        </tbody>
      </table>
      {/* <div className='buttonContainer'>
        <button className="backButton" onClick={() => setViewTable(false)}>Back to Form</button>
      </div> */}
    </div>
  );
};

export default UnifiedTable;


const combinDailyList = (meals, medications, execrises) => {


  const extendedMeals = meals ? meals.map((meal) => ({ ...meal, type: "Meal" })) : []

  const extendedMedications = medications ? medications.map((medication) => ({ ...medication, type: "Medication" })) : []
  const extendedExecrises = execrises ? execrises.map((exercise) => ({ ...exercise, type: "Exercise" })) : []

  return [...extendedMeals, ...extendedMedications, ...extendedExecrises]
}