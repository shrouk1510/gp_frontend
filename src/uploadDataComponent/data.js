import React, { useEffect, useState } from 'react';
import { useMedicalRecordStore } from "../hooks/use-medical-record-store";
import RegisteredNav from "../RegisteredNavComponent/RegisteredNav";
import TodoForm from "../medical-records/TodoForm";
import TodoTable from "../medical-records/TodoTable";
import { deleteMedicalRecordRequest, getAllUserMedicalRecordsRequest } from "../lib/api/medical-record";
import toast from 'react-hot-toast';

const UploadData = () => {
    const { medicalRecords, setMedicalRecords, removeMedicalRecord } = useMedicalRecordStore()
    // const [records, setRecords] = useState([]);
    const [record, setRecord] = useState(null)
    const [viewTable, setViewTable] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            const fetchedRecords = await getAllUserMedicalRecordsRequest()
            setMedicalRecords(fetchedRecords)
        }

        fetchMedicalRecords()
    }, [])

    const handleUpdate = (record) => {
        // const recordToUpdate = article;
        // setRecords(records.filter((_, i) => i !== index));
        setRecord(record)
        setViewTable(false);
        // Set form fields to the recordToUpdate values
        // You may need to pass these values to the TodoForm component
    };

    //approved
    const handleDelete = async (recordId) => {

        try {
            await deleteMedicalRecordRequest(recordId)
            removeMedicalRecord(recordId)
            toast.success("record deleted")
        } catch (error) {
            typeof error === "string" ? toast.error(error) : alert(error);
        }
        // setRecords(records.filter((_, i) => i !== index));
    };

    return (
        <div>
            <RegisteredNav></RegisteredNav>

            {viewTable ? (
                <TodoTable
                    records={medicalRecords}
                    setViewTable={setViewTable}
                    warningMessage={warningMessage}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            ) : (
                <>
                   
                    <TodoForm
                        // setRecords={setRecords}
                        initialRecord={record}
                        setViewTable={setViewTable}
                        setWarningMessage={setWarningMessage}
                    />
                </>
            )}
        </div>
    );
};

export default UploadData;
