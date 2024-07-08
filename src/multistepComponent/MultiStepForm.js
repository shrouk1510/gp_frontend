import React, { useEffect, useState } from 'react';
// import MedicationForm from '../MedicationFormComponent/mediction';
// import ExerciseForm from '../ExerciseFormCompenent/Exercise';
// import MealForm from '../MealFormComponent/Meal';
import UnifiedTable from './UnifiedTable';
import RegisteredNav from '../RegisteredNavComponent/RegisteredNav';
import { getDailyListRequest, getDailyListExercisesRequest, getDailyListMedicationsRequest, getDailyListMealsRequest } from '../lib/api/daily-list';
import { useDailyListStore } from '../hooks/use-daily-list-store';
// import toast from 'react-hot-toast'
import { useModal } from '../hooks/use-modal-store';

const MultiStepForm = () => {
    const { setDailyList } = useDailyListStore()
    // const [step, setStep] = useState(1);
    const { onOpen } = useModal()
    // const [combinedData, setCombinedData] = useState([]);
    // const [viewTable, setViewTable] = useState(false);

    // const [meal, setMeal] = useState(null)
    // const [exercise, setExercise] = useState(null)
    // const [medication, setMedication] = useState(null)

    // const nextStep = () => setStep(prevStep => prevStep + 1);
    // const prevStep = () => setStep(prevStep => prevStep - 1);

    // const handleViewSchedule = () => setViewTable(true);

    // const handleSubmitAll = async (newData) => {
    //     // Check if newData has at least one non-empty field before adding it to combinedData
    //     if (newData.name || newData.time) {
    //         setCombinedData(prevData => [...prevData, newData]);
    //     }

    //     // console.log(newData)
    //     console.log(combinedData)

    //     const meals = combinedData.filter(data => data.type === "Meal")
    //     const medications = combinedData.filter(data => data.type === "Medication")

    //     const exercises = combinedData.filter(data => data.type === "Exercise")
    //     console.log(combinedData)
    //     console.log(meals, medications, exercises)

    //     const response = await saveDailyListRequest({
    //         meals,
    //         medications,
    //         exercises,
    //         mealAlertTime: meals.length > 0 ? meals[0].time : "",
    //         exerciseAlertTime: exercises.length > 0 ? exercises[0].time : "",
    //         medicationAlertTime: medications.length > 0 ? medications[0].time : "",
    //     })
    //     // throw "error"
    //     setDailyList(response)
    //     setCombinedData([])
    //     setViewTable(true); // Navigate to the table view

    // };


    const handleUpdate = (dailyList, type) => {
        // const recordToUpdate = article;
        // setRecords(records.filter((_, i) => i !== index));
        switch (type) {
            case 'Meal':
                // setMeal(dailyList)
                onOpen("meal", { dailyList })
                break
            case 'Medication':
                onOpen("medication", { dailyList })
                break
            case 'Exercise':
                onOpen("exercise", { dailyList })
                break
        }

        // setViewTable(false);
        // Set form fields to the recordToUpdate values
        // You may need to pass these values to the TodoForm component
    };


    useEffect(() => {
        const fetchDailyList = async () => {
            // const fetchedDailyList = await getDailyListRequest()
            const fetchedMeals = await getDailyListMealsRequest()
            const fetchedMedications = await getDailyListMedicationsRequest()
            const fetchedExercises = await getDailyListExercisesRequest()
            // console.log(fetchedDailyList)
            setDailyList([])
        }
        fetchDailyList()
    }, [])
    return (
        <div className="multiStepFormContainer">
            <RegisteredNav />
            {/* {viewTable ? ( */}
            <div className="scheduleTables">
               
                <UnifiedTable handleUpdate={handleUpdate} />
            </div>
            {/* ) : (
               <>
                   {step === 1 && (
            //             <MedicationForm nextStep={nextStep} initialMedication={medication} handleViewSchedule={handleViewSchedule} setCombinedData={setCombinedData} />
            //         )}
            //         {step === 2 && (
            //             <ExerciseForm nextStep={nextStep} initialExercise={exercise} prevStep={prevStep} setCombinedData={setCombinedData} />
            //         )}
            //         {step === 3 && (
            //             <MealForm prevStep={prevStep} initialMeal={meal} handleSubmitAll={handleSubmitAll} />
            //         )}
            //     </>
            // )} */}
        </div>
    );
};

export default MultiStepForm;
