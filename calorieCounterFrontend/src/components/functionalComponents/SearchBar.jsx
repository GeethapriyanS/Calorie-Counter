import React, { useState } from "react";
import axios from "axios";
import "../../css/Searchbar.css";

const SearchBar = ({ setMeals}) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        setError("");
        try {
            const email = localStorage.getItem("userEmail");
            if (!email) {
                setError("User email is missing. Please log in again.");
                return;
            }
            const response = await axios.post("https://calorie-counter-83w9.onrender.com/add-meal", { query, email });
            setMeals(prevMeals => [...prevMeals, response.data.meal]); 
        } catch (error) {
            console.error(error);
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
