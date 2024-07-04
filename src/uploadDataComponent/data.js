import RegisteredNav from "../RegisteredNavComponent/RegisteredNav";
import TodoForm from "../medical-records/TodoForm"
import TodoTable from "../medical-records/TodoTable";
import React, { useState } from 'react';

const UploadData = () => {

    const [records, setRecords] = useState([]);
    const [viewTable, setViewTable] = useState(false);
    return (
        <div>
            <RegisteredNav></RegisteredNav>
            {/* <div className="app-container"> */}
                {viewTable ? (
                    <TodoTable records={records} setViewTable={setViewTable} />
                ) : (
                    <TodoForm setRecords={setRecords} setViewTable={setViewTable} />
                )}
            {/* </div> */}
            

        </div>
    )
}

export default UploadData;