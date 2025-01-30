import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../../css/Goals.css"; 

const Goals = () => {
    const [goal, setGoal] = useState(2000);
    const [savedGoal, setSavedGoal] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const response = await axios.get("http://localhost:3001/get-goal");
                setSavedGoal(response.data.goal);
            } catch (error) {
                console.error("Error fetching goal:", error);
            }
        };
        fetchGoal();
    }, []);

    const handleSaveGoal = async () => {
        setLoading(true);
        try {
            await axios.post("http://localhost:3001/set-goal", { goal: Number(goal) });
            setSavedGoal(Number(goal));
            alert("Goal Saved Successfully");
        } catch (error) {
            alert("Failed to Save Goal");
        }
        setLoading(false);
    };

    const handleResetGoal = () => {
        setGoal(2000);
        setSavedGoal(2000);
    };

    return (
        <div>
        <Navbar />
        <div className="goals-container">
            <div className="goals-content">
                <h2 className="goals-title">Set Your Daily Calorie Goal</h2>

                {savedGoal !== null && (
                    <p className="goals-current">Current Goal: <strong>{savedGoal} Calories</strong></p>
                )}

                <input 
                    type="number" 
                    value={goal} 
                    onChange={(e) => setGoal(e.target.value)} 
                    className="goals-input"
                    placeholder="Enter calorie goal" 
                />

                <div className="goals-buttons">
                    <button onClick={handleSaveGoal} className="goals-btn save-btn" disabled={loading}>
                        {loading ? "Saving..." : "Save Goal"}
                    </button>
                    <button onClick={handleResetGoal} className="goals-btn reset-btn">
                        Reset Goal
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Goals;
