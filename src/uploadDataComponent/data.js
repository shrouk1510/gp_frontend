import RegisteredNav from "../RegisteredNavComponent/RegisteredNav";
import TodoForm from "../medical-records/TodoForm"
import TodoTable from "../medical-records/TodoTable";
import React, { useState } from 'react';

const UploadData = () => {

    const [records, setRecords] = useState([]);
    const [viewTable, setViewTable] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    return (
        <div>
            <RegisteredNav></RegisteredNav>
            
            {viewTable ? (
                <TodoTable records={records} setViewTable={setViewTable} warningMessage={warningMessage} />
            ) : (
                <TodoForm setRecords={setRecords} setViewTable={setViewTable} setWarningMessage={setWarningMessage} />
            )}
        
            

        </div>
    )
}

export default UploadData;