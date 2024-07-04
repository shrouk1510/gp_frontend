import React, { useState } from 'react';
import RegisteredNav from "../RegisteredNavComponent/RegisteredNav";
import MedicationForm from "../MedicationFormComponent/Mediction";
import MedicationTable from "../MedicationFormComponent/MedicationTable";

const Medical = () => {
  const [medications, setMedications] = useState([]);
  const [viewMedicationTable, setViewMedicationTable] = useState(false);

  return (
    <div>
      <RegisteredNav />
      {viewMedicationTable ? (
        <MedicationTable medications={medications} setViewTable={setViewMedicationTable} />
      ) : (
        <MedicationForm setMedications={setMedications} setViewTable={setViewMedicationTable} />
      )}
    </div>
  );
};

export default Medical;
