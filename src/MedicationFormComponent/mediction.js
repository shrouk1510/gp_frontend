import React, { useState, useEffect } from 'react';
import './medication.css';
import toast from 'react-hot-toast';
import { useDailyListStore } from '../hooks/use-daily-list-store';
import { useModal } from '../hooks/use-modal-store';
import { addDailyListMedicationRequest, updateDailyListMedicationRequest } from '../lib/api/daily-list';

const MedicationForm = ({ intialMedication: initialMedication }) => {

  const { onClose } = useModal()
  const { updateMedication, setDailyList } = useDailyListStore()

  const [formData, setFormData] = useState({
    name: '',
    dose: '',
    time: '',
    date: '' // New state for date
  });

  const [isSubmiting, setIsSubmiting] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (formData.name || formData.dose || formData.time) {
  //     setCombinedData(prevData => [...prevData, { ...formData, type: 'Medication' }]);
  //   }
  //   setFormData({ name: '', dose: '', time: '', date: '' });
  //   nextStep();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if name and time fields are empty
    if (!formData.name && !formData.time) {
      // Optionally, you can provide feedback to the user that fields are required
      toast.error('All fields are required');
      return;
    }

    try {
      setIsSubmiting(true)
      if (initialMedication) {
        //update existing meal
        const updatedDailyList = await updateDailyListMedicationRequest({
          ...formData
        }, initialMedication.id)

        // const updatedMedication = updatedDailyList.medications.find(medication => medication.id === initialMedication.id)

        // if (!updatedMedication) {
        //   throw 'medication updated but not returned by response'
        // }

        // // console.log(updatedMeal)
        // updateMedication(updatedMedication)
        setDailyList(updatedDailyList)
        toast.success('medication updated')
      } else {
        //create new meal
        const createdMedication = await addDailyListMedicationRequest({
          ...formData
        })

        setDailyList(createdMedication)

        toast.success('medication created')

      }
      onClose()
      // handleSubmitAll({ ...formData, type: 'Meal' });
      setFormData({ name: '', dose: '', time: '', date: '' }); // Reset date field as well
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error)
    } finally {
      setIsSubmiting(false)
    }

  };

  useEffect(() => {
    if (initialMedication) {
      setFormData({
        name: initialMedication.name,
        dose: initialMedication.dose,
        time: initialMedication.time,
        date: (initialMedication.date)
      })
    }
  }, [initialMedication])

  const titleText = initialMedication ? `Edit ${initialMedication.name}` : "Medication Data"
  const submitText = initialMedication ? "Edit" : "Add"
  const submitingText = initialMedication ? "Editing..." : "Adding..."

  return (
    <div className='medicationContainer'>
      <form onSubmit={handleSubmit} className="medication-form">
        <div className="form-group">
          <div className="header">
            <div className="text">{titleText}</div>
            <div className="underline"></div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Medication Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dose">Dose:</label>
            <input
              placeholder="For example 100mg"
              type="text"
              id="dose"
              name="dose"
              value={formData.dose}
              onChange={handleChange}
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
            />
          </div>
          <div className="form-group"> {/* New date field */}
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="subb-button" disabled={isSubmiting}>{isSubmiting ? submitingText : submitText}</button>
      </form>
      {/* <div className='medicalSchedule'>
        <button className="see" onClick={handleViewSchedule}>View Your Schedule</button>
      </div> */}
    </div>
  );
};

export default MedicationForm;
