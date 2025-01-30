import SearchBar from "./SearchBar";
import MealList from "./MealList";
import CalorieChart from "./CalorieChart";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Meal.css";
import Navbar from "./Navbar";

const MealsContainer = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/")
            .then(res => setMeals(res.data))
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    return (
        <div>
            <Navbar />
        <div className='homeContainer'>
            <div className='contentWrapper'>
                <SearchBar setMeals={setMeals} />
                <MealList meals={meals} />
                <CalorieChart meals={meals} />
            </div>
        </div>
        </div>
    );
};

export default MealsContainer;
