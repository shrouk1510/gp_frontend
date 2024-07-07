import React, { useEffect, useState } from 'react';
import { useMedicalRecordStore } from "../hooks/use-medical-record-store";
import RegisteredNav from "../RegisteredNavComponent/RegisteredNav";
import TodoForm from "../medical-records/TodoForm";
import TodoTable from "../medical-records/TodoTable";
import { getAllUserMedicalRecordsRequest } from "../lib/api/medical-record";

const UploadData = () => {
    const { medicalRecords, setMedicalRecords } = useMedicalRecordStore()
    // const [records, setRecords] = useState([]);
    const [viewTable, setViewTable] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            const fetchedRecords = await getAllUserMedicalRecordsRequest()
            setMedicalRecords(fetchedRecords)
        }

        fetchMedicalRecords()
    }, [])

    const handleUpdate = (index) => {
        const recordToUpdate = records[index];
        setRecords(records.filter((_, i) => i !== index));
        setViewTable(false);
        // Set form fields to the recordToUpdate values
        // You may need to pass these values to the TodoForm component
    };

    const handleDelete = (index) => {
        setRecords(records.filter((_, i) => i !== index));
    };

    return (
        <div>
            <RegisteredNav></RegisteredNav>
            
            {viewTable ? (
                <TodoTable
                    records={records}
                    setViewTable={setViewTable}
                    warningMessage={warningMessage}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            ) : (
                <TodoForm
                    setRecords={setRecords}
                    setViewTable={setViewTable}
                    setWarningMessage={setWarningMessage}
                />
            )}
        </div>
    );
};

export default UploadData;
