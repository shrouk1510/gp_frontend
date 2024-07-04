import React from 'react'; 
import './Meal.css'; 
 
const MealTable = ({ meals, setViewTable }) => { 
    return ( 
        <div className="tableeContainer"> 
            <div className="meal-table"> 
                <h2>Meal Schedule</h2> 
                <table> 
                    <thead> 
                        <tr> 
                            <th>Meal Name</th> 
                            <th>Time</th> 
                        </tr> 
                    </thead> 
                    <tbody> 
                        {meals.map((meal, index) => ( 
                            <tr key={index}> 
                                <td>{meal.name}</td> 
                                <td>{meal.time}</td> 
                            </tr> 
                        ))} 
                    </tbody> 
                </table> 
            </div> 
            <div className='mealButtonContainer'> 
                <button className="mealBack" onClick={() => setViewTable(false)}>Back to Form</button> 
            </div> 
        </div> 
    ); 
}; 
 
export default MealTable;