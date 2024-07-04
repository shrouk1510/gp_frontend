import RegisteredNav from "../RegisteredNavComponent/RegisteredNav";
import ExerciseTable from "../ExerciseFormCompenent/ExerciseTable";
import ExerciseForm from '../ExerciseFormCompenent/Exercise'
import React,{useState} from 'react';


const Excer=()=>{
    const [exercises, setExercises] = useState([]);
    const [viewExerciseTable, setViewExerciseTable] = useState(false);
    return(
        <div>
            <RegisteredNav/>
            {viewExerciseTable ? ( 
                    <ExerciseTable exercises={exercises} setViewTable={setViewExerciseTable} /> 
                ) : ( 
                    <ExerciseForm setExercises={setExercises} setViewTable={setViewExerciseTable} /> 
                )}
        </div>
    )
}
export default Excer;