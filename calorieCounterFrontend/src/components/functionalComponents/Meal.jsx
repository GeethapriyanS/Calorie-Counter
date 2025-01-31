import SearchBar from "./SearchBar";
import MealList from "./MealList";
import CalorieChart from "./CalorieChart";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Meal.css";
import Navbar from "./Navbar";

const MealsContainer = () => {
    const [meals, setMeals] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            console.error("User email is missing. Please log in again.");
            return;
        }

        axios.get(`https://calorie-counter-83w9.onrender.com/get-meal?email=${email}`)
            .then(res => {
                setMeals(res.data.meals);
                setTotalCalories(res.data.totalCalories);
            })
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    useEffect(() => {
        const fetchTotalCalories = async () => {
            try {
                const email = localStorage.getItem("userEmail");
                const response = await axios.get(`https://calorie-counter-83w9.onrender.com/get-total-calories?email=${email}`);
                setTotalCalories(response.data.totalCalories1); 
            } catch (error) {
                console.error("Error fetching total calories:", error);
            }
        };

        fetchTotalCalories();
    }, []);

    const deleteMeal = (mealId) => {
        axios.delete(`https://calorie-counter-83w9.onrender.com/delete-meal/${mealId}`)
            .then(() => {
                setMeals(meals.filter(meal => meal._id !== mealId));
            })
            .catch(err => console.error("Error deleting meal:", err));
    };

    const editMeal = (mealId, updatedMeal) => {
        axios.put(`https://calorie-counter-83w9.onrender.com/edit-meal/${mealId}`, updatedMeal)
            .then(res => {
                setMeals(meals.map(meal => meal._id === mealId ? res.data.meal : meal));
            })
            .catch(err => console.error("Error updating meal:", err));
    };

    return (
        <div>
            <Navbar />
            <div className='homeContainer'>
                <div className='contentWrapper'>
                    <h2>Total Calories Burned Today: {totalCalories} kcal</h2>
                    <SearchBar setMeals={setMeals} />
                    <MealList meals={meals} deleteMeal={deleteMeal} editMeal={editMeal} />
                    <CalorieChart meals={meals} />
                </div>
            </div>
        </div>
    );
};

export default MealsContainer;
