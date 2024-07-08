import React, { useEffect, useState } from 'react';
import './Meal.css';
import toast from 'react-hot-toast';
import { addDailyListMealRequest, updateDailyListMealRequest } from '../lib/api/daily-list';
import { useModal } from '../hooks/use-modal-store';

const MealForm = ({ intialMeal }) => {
  const { onClose } = useModal()
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    date: new Date().toISOString().split('T')[0] // Set the default date to today's date
  });

  const [isSubmiting, setIsSubmiting] = useState(false)
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

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
      if (intialMeal) {
        //update existing meal
        const updatedMeal = await updateDailyListMealRequest({
          ...formData
        }, intialMeal.id)

        toast.success('meal updated')
      } else {
        //create new meal
        const createdMeal = await addDailyListMealRequest({
          ...formData
        })


        toast.success('meal created')

      }
      onClose()
      // handleSubmitAll({ ...formData, type: 'Meal' });
      setFormData({ name: '', time: '', date: new Date().toISOString().split('T')[0] }); // Reset date field as well
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error)
    } finally {
      setIsSubmiting(false)
    }

  };

  useEffect(() => {
    if (intialMeal) {
      setFormData({
        name: intialMeal.name,
        time: intialMeal.time,
        date: intialMeal.date
      })
    }
  }, [intialMeal])


  const titleText = intialMeal ? `Edit ${intialMeal.name}` : "Meal Data"
  const submitText = intialMeal ? "Edit" : "Add"
  const submitingText = intialMeal ? "Editing..." : "Adding..."

  return (
    <div className='mealContainer'>
      <form onSubmit={handleSubmit} className="meal-form">
        <div className="form-group">
          <div className="header">
            <div className="text">{titleText}</div>
            <div className="underline"></div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Meal Type:</label>
            <select
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            >
              <option value="" disabled>Select a meal type</option>
              {mealTypes.map((mealType) => (
                <option key={mealType} value={mealType}>{mealType}</option>
              ))}
            </select>
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
        {/* <button type="button" className="mealback-button" onClick={prevStep}>Back</button> */}
        <button type="submit" className="submit-button" disabled={isSubmiting}>{isSubmiting ? submitingText : submitText}</button>
      </form>
    </div>
  );
};

export default MealForm;
