import React from 'react'; 
import './Exercise.css'; 
 
const ExerciseTable = ({ exercises, setViewTable }) => { 
    return ( 
        <div className='tableContainer'> 
            <div className="exercise-table"> 
                <h2>Exercise Schedule</h2> 
                <table> 
                    <thead> 
                        <tr> 
                            <th>Time</th> 
                            <th>Duration (minutes)</th> 
                        </tr> 
                    </thead> 
                    <tbody> 
                        {exercises.map((exercise, index) => ( 
                            <tr key={index}> 
                                <td>{exercise.time}</td> 
                                <td>{exercise.duration}</td> 
                            </tr> 
                        ))} 
                    </tbody> 
                </table> 
            </div> 
            <div className='exerciseButtonContainer'> 
                <button className="exerciseBack" onClick={() => setViewTable(false)}>Back to Form</button> 
            </div> 
 
        </div> 
    ); 
}; 
 
export default ExerciseTable;