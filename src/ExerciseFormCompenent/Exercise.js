import React, { useState, useEffect } from 'react';
import './Exercise.css';
import toast from 'react-hot-toast';
import { addDailyListExerciseRequest, updateDailyListExerciseRequest } from '../lib/api/daily-list';
import { useModal } from '../hooks/use-modal-store';
import { useDailyListStore } from '../hooks/use-daily-list-store';

const ExerciseForm = ({ initialExercise }) => {

  const { onClose } = useModal()
  const { setDailyList } = useDailyListStore()
  const [formData, setFormData] = useState({
    exerciseName: '',
    durationMinutes: '',
    time: '',
    date: new Date().toISOString().split('T')[0] // Set the default date to today's date
  });

  const [isSubmiting, setIsSubmiting] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.exerciseName || !formData.durationMinutes || !formData.time || !formData.date) {
      toast.error('all fields are required')
      return
    }

    try {
      setIsSubmiting(true)
      if (initialExercise) {
        //update existing meal
        const updatedExercise = await updateDailyListExerciseRequest({
          ...formData, durationMinutes: Number(formData.durationMinutes),
        }, initialExercise.id)

        setDailyList(updatedExercise)

        toast.success('exercise updated')
      } else {
        //create new meal
        const createdExercise = await addDailyListExerciseRequest({
          ...formData,
          durationMinutes: Number(formData.durationMinutes)
        })

        setDailyList(createdExercise)
        toast.success('exercise created')

      }
      onClose()
      setFormData({ exerciseName: '', durationMinutes: '', time: '', date: new Date().toISOString().split('T')[0] }); // Reset date field as well
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error)
    } finally {
      setIsSubmiting(false)
    }
    // nextStep();
  };


  useEffect(() => {
    if (initialExercise) {
      setFormData({
        name: initialExercise.name,
        durationMinutes: initialExercise.durationMinutes,
        time: initialExercise.time,
        date: initialExercise.date
      })
    }
  }, [initialExercise])

  const titleText = initialExercise ? `Edit ${initialExercise.name}` : "Exercise Data"
  const submitText = initialExercise ? "Edit" : "Add"
  const submitingText = initialExercise ? "Editing..." : "Adding..."
  return (
    <div className='exerciseContainer'>
      <form onSubmit={handleSubmit} className="exercise-form">
        <div className="form-group">
          <div className="header">
            <div className="text">{titleText}</div>
            <div className="underline"></div>
          </div>
          <div className="form-group">
            <label htmlFor="exerciseName">Exercise Name:</label>
            <input
              type="text"
              id="exerciseName"
              name="exerciseName"
              value={formData.exerciseName}
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
          <div className="form-group">
            <label htmlFor="durationMinutes">Duration (in minutes):</label>
            <input
              type="number"
              id="durationMinutes"
              inputMode="numeric"
              name="durationMinutes"
              value={formData.durationMinutes}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
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
        {/* <button type="button" className="Exerback-button" onClick={prevStep}>Back</button> */}
        <button type="submit" className="sub-button" disabled={isSubmiting}>{isSubmiting ? submitingText : submitText}</button>
      </form>
    </div>
  );
};

export default ExerciseForm;
