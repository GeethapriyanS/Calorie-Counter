import React, { useState } from "react";
import Navbar from "./Navbar";
import "../../css/calc.css"

const CalorieCalculator = () => {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [calories, setCalories] = useState(null);

    const calculateCalories = () => {
        if (!height || !weight) {
            alert("Please enter both height and weight.");
            return;
        }
        const estimatedCalories = Math.round(10 * weight + 6.25 * height - 5 * 25 + 5);
        setCalories(estimatedCalories);
    };

    return (
        <div>
            <Navbar />
        <div className="calorieCalculator">
            <h2>Calorie Needs Estimator</h2>
            <div className="inputGroup">
                <label>Height (cm):</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div className="inputGroup">
                <label>Weight (kg):</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <button onClick={calculateCalories} className="calculateButton">Calculate</button>

            {calories && (
                <div className="calorieResult">
                    <p>Estimated Daily Calories: <strong>{calories} kcal</strong></p>
                </div>
            )}
        </div>
        </div>
    );
};

export default CalorieCalculator;
