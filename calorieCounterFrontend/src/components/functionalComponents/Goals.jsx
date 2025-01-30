import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Goals.css";
import Navbar from "./Navbar";

const Goals = ({ totalCalories }) => {
    const [goal, setGoal] = useState("");
    const [savedGoal, setSavedGoal] = useState(null);

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const email = localStorage.getItem("userEmail");
                const response = await axios.get(`http://localhost:3001/get-goal?email=${email}`);
                setSavedGoal(response.data.goal);
            } catch (error) {
                console.error("Error fetching goal:", error);
            }
        };

        fetchGoal();
    }, []);

    const updateGoal = async () => {
        try {
            const email = localStorage.getItem("userEmail");
            await axios.post("http://localhost:3001/set-goal", { email, goal });
            setSavedGoal(goal);
            alert("Calorie goal updated!");
        } catch (error) {
            console.error("Error updating goal:", error);
        }
    };

    return (
        <div>
        <Navbar />
        <div className="goalContainer">
            <h3>Set Your Calorie Goal</h3>
            <input
                type="number"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Enter calorie target"
                className="goalInput"
            />
            <button onClick={updateGoal} className="goalButton">Set Goal</button>

            {savedGoal && (
                <div className="goalStatus">
                    <p>Goal: {savedGoal} kcal</p>
                    <p>Consumed: {totalCalories} kcal</p>
                    <p style={{ color: totalCalories > savedGoal ? "red" : "green" }}>
                        {totalCalories > savedGoal ? "⚠️ Exceeded Goal!" : "✅ On Track"}
                    </p>
                </div>
            )}
        </div>
        </div>
    );
};

export default Goals;
