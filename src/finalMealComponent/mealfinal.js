import RegisteredNav from "../RegisteredNavComponent/RegisteredNav";
import MealForm from '../MealFormComponent/Meal'
import MealTable from "../MealFormComponent/MealTable";
import React,{useState} from 'react';


const MealFinal=()=>{
    const [meals, setMeals] = useState([]);
    const [viewMealTable, setViewMealTable] = useState(false);
    return(
        <div>
            <RegisteredNav/>
            {viewMealTable ? ( 
                    <MealTable meals={meals} setViewTable={setViewMealTable} /> 
                ) : ( 
                    <MealForm setMeals={setMeals} setViewTable={setViewMealTable} /> 
                )}
        </div>
    )
}


export default MealFinal;