import React from "react";
import "../../css/Meallist.css";

const MealList = ({ meals }) => {
    return (
        <div className="mealList">
            {meals.map(meal => (
                <div key={meal.name} className="mealItem">
                    <span className="mealName">{meal.name}</span>
                    <span className="mealCalories">{meal.calories} kcal</span>
                </div>
            ))}
        </div>
    );
};

export default MealList;
