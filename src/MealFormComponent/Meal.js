import React, { useEffect, useState } from 'react';
import './Meal.css';
import toast from 'react-hot-toast';
import { addDailyListMealRequest, updateDailyListMealRequest } from '../lib/api/daily-list';
import { useModal } from '../hooks/use-modal-store';
import { useDailyListStore } from '../hooks/use-daily-list-store';

const MealForm = ({ initialMeal }) => {
  const { onClose } = useModal()
  const { setDailyList, updateMeal } = useDailyListStore()
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
      if (initialMeal) {
        //update existing meal
        const updatedDailyList = await updateDailyListMealRequest({
          ...formData
        }, initialMeal.id)

        // const updatedMeal = updatedDailyList.meals.find(meal => meal.id === initialMeal.id)

        // if (!updatedMeal) {
        //   throw 'meal updated but not returned by response'
        // }

        // // console.log(updatedMeal)
        // updateMeal(updatedMeal)

        setDailyList(updatedDailyList)
        toast.success('meal updated')
      } else {
        //create new meal
        const createdDailyList = await addDailyListMealRequest({
          ...formData
        })
        setDailyList(createdDailyList)

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
    if (initialMeal) {
      setFormData({
        name: initialMeal.name,
        time: initialMeal.time,
        date: initialMeal.date
      })
    }
  }, [initialMeal])


  const titleText = initialMeal ? `Edit ${initialMeal.name}` : "Meal Data"
  const submitText = initialMeal ? "Edit" : "Add"
  const submitingText = initialMeal ? "Editing..." : "Adding..."

  return (
    <div className='mealContainer'>
      <form onSubmit={handleSubmit} className="meal-form">
        <div className="form-group">
          <div className="header">
            <div className="text">{titleText}</div>
            {initialMeal && <p>#{initialMeal?.id}</p>}
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
