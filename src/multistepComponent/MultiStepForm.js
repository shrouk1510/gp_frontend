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
      setCombinedData(prevData => [...prevData, newData]);
      setViewTable(true);
    };
  
    if (viewTable) {
      return (
        <div className="scheduleTables">
          <RegisteredNav/>
          <UnifiedTable combinedData={combinedData} setViewTable={setViewTable} />
        </div>
      );
    }
  
    return (
      <div className="multiStepFormContainer">
        <RegisteredNav/>
        {step === 1 && (
          <MedicationForm nextStep={nextStep} handleViewSchedule={handleViewSchedule} setCombinedData={setCombinedData} />
        )}
        {step === 2 && (
          <ExerciseForm nextStep={nextStep} prevStep={prevStep} setCombinedData={setCombinedData} />
        )}
        {step === 3 && (
          <MealForm prevStep={prevStep} handleSubmitAll={handleSubmitAll} />
        )}
      </div>
    );
  };
  
  export default MultiStepForm;
