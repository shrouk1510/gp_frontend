import React, { useState } from 'react';
import MedicationForm from '../MedicationFormComponent/mediction';
import ExerciseForm from '../ExerciseFormCompenent/Exercise';
import MealForm from '../MealFormComponent/Meal';
import UnifiedTable from './UnifiedTable';
import RegisteredNav from '../RegisteredNavComponent/RegisteredNav';

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [combinedData, setCombinedData] = useState([]);
    const [viewTable, setViewTable] = useState(false);

    const nextStep = () => setStep(prevStep => prevStep + 1);
    const prevStep = () => setStep(prevStep => prevStep - 1);

    const handleViewSchedule = () => setViewTable(true);

    const handleSubmitAll = (newData) => {
        // Check if newData has at least one non-empty field before adding it to combinedData
        if (newData.name || newData.time) {
            setCombinedData(prevData => [...prevData, newData]);
        }
        setViewTable(true); // Navigate to the table view
    };

    return (
        <div className="multiStepFormContainer">
            <RegisteredNav />
            {viewTable ? (
                <div className="scheduleTables">
                    <UnifiedTable combinedData={combinedData} setViewTable={setViewTable} />
                </div>
            ) : (
                <>
                    {step === 1 && (
                        <MedicationForm nextStep={nextStep} handleViewSchedule={handleViewSchedule} setCombinedData={setCombinedData} />
                    )}
                    {step === 2 && (
                        <ExerciseForm nextStep={nextStep} prevStep={prevStep} setCombinedData={setCombinedData} />
                    )}
                    {step === 3 && (
                        <MealForm prevStep={prevStep} handleSubmitAll={handleSubmitAll} />
                    )}
                </>
            )}
        </div>
    );
};

export default MultiStepForm;
