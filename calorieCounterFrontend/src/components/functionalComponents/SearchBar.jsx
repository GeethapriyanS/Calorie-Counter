import React, { useState } from "react";
import axios from "axios";
import "../../css/Searchbar.css";

const SearchBar = ({ setMeals }) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!query) return;  
        setLoading(true);
        setError(""); 
    
        try {
            const response = await axios.get(
                `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
                { headers: { "X-Api-Key": "fgNDimI88JGH2COMtmuNoQ==LdcHcWicjxpSiMAV" } }
            );
    
            const nutrition = response.data.items[0] || {};
    
            const newMeal = {
                name: query,
                calories: nutrition.calories || 0,  
                protein: nutrition.protein_g || 0,
                carbs: nutrition.carbohydrates_total_g || 0,
                fat: nutrition.fat_total_g || 0
            };
    
            setMeals(prevMeals => [newMeal, ...prevMeals]);
        } catch (error) {
            setError("Failed to fetch nutrition info. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="searchBar">
            <input 
                className="inputField"
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Enter food name..."
            />
            <button 
                className="searchButton"
                onClick={handleSearch} 
                disabled={loading}
            >
                {loading ? "Loading..." : "Add Meal"}
            </button>
            {error && <div className="errorMessage">{error}</div>}
        </div>
    );
};

export default SearchBar;