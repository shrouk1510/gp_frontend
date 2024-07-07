import React, { useEffect, useState } from 'react';
import { useMedicalRecordStore } from "../hooks/use-medical-record-store";
import RegisteredNav from "../RegisteredNavComponent/RegisteredNav";
import TodoForm from "../medical-records/TodoForm"
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
    return (
        <div>
            <RegisteredNav></RegisteredNav>

            {viewTable ? (
                <TodoTable records={medicalRecords} setViewTable={setViewTable} warningMessage={warningMessage} />
            ) : (
                <TodoForm setViewTable={setViewTable} setWarningMessage={setWarningMessage} />
            )}



        </div>
    )
}

export default UploadData;