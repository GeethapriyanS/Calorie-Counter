import React, { useState } from "react";
import "../../css/Meallist.css";

const MealList = ({ meals, deleteMeal, editMeal }) => {
    const [editingMeal, setEditingMeal] = useState(null);
    const [updatedMeal, setUpdatedMeal] = useState({ name: "", calories: "" });

    const handleEditClick = (meal) => {
        setEditingMeal(meal._id); 
        setUpdatedMeal({ name: meal.name, calories: meal.calories });
    };

    const handleEditChange = (e) => {
        setUpdatedMeal({ ...updatedMeal, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (mealId) => {
        editMeal(mealId, updatedMeal); 
        setEditingMeal(null); 
    };

    return (
        <div>
            <h3>Meal List</h3>
            <div className="mealList">
                {meals.map((meal) => (
                    <div key={meal._id} className="mealItem">
                        {editingMeal === meal._id ? (
                            <div className="editForm">
                                <input
                                    type="text"
                                    name="name"
                                    value={updatedMeal.name}
                                    onChange={handleEditChange}
                                    className="editInput"
                                />
                                <input
                                    type="number"
                                    name="calories"
                                    value={updatedMeal.calories}
                                    onChange={handleEditChange}
                                    className="editInput"
                                />
                                <button className="saveButton" onClick={() => handleEditSubmit(meal._id)}>💾 Save</button>
                                <button className="cancelButton" onClick={() => setEditingMeal(null)}>❌ Cancel</button>
                            </div>
                        ) : (
                            <>
                                <span className="mealInfo">{meal.name} - {meal.calories} kcal</span>
                                <div className="mealButtons">
                                    <button className="deleteButton" onClick={() => deleteMeal(meal._id)}>Delete</button>
                                    <button className="editButton" onClick={() => handleEditClick(meal)}>Edit</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MealList;
