import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Foodsearch.css";
import Navbar from "./Navbar";

const FoodSearch = ({ addMeal }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const fetchSuggestions = async () => {
        if (!query) return;

        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`http://localhost:3001/search-food?query=${query}`);
            setSuggestions(response.data.hints.map(hint => ({
                name: hint.food.label,
                calories: hint.food.nutrients.ENERC_KCAL
            })));
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setError("Failed to fetch food data.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddMeal = (food) => {
        addMeal(food);
        setQuery("");
        setSuggestions([]);
    };

    const addToFavorites = (food) => {
        if (!favorites.some(fav => fav.name === food.name)) {
            const updatedFavorites = [...favorites, food];
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
    };

    const removeFromFavorites = (foodName) => {
        const updatedFavorites = favorites.filter(food => food.name !== foodName);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div>
            <Navbar />
        <div className="foodSearch">
            <h2>🔍 Search & Add Food</h2>
            <p>Type a food name below and select from the suggestions to log it in your meal tracker.</p>

            <div className="searchContainer">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter food name..."
                    className="foodInput"
                />
                <button className="searchButton" onClick={fetchSuggestions} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>

            {error && <p className="error">{error}</p>}

            <ul className="suggestionList">
                {suggestions.map((food, index) => (
                    <li key={index}>
                        {food.name} - {Math.round(food.calories)} kcal
                        <button className="addButton" onClick={() => handleAddMeal(food)}>✅ Add</button>
                        <button className="favButton" onClick={() => addToFavorites(food)}>⭐ Favorite</button>
                    </li>
                ))}
            </ul>

            {favorites.length > 0 && (
                <div className="favoritesSection">
                    <h3>❤️ Favorite Foods</h3>
                    <ul className="favoritesList">
                        {favorites.map((food, index) => (
                            <li key={index}>
                                {food.name} - {Math.round(food.calories)} kcal
                                <button className="addButton" onClick={() => handleAddMeal(food)}>✅ Add</button>
                                <button className="removeButton" onClick={() => removeFromFavorites(food.name)}>❌ Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        </div>
    );
};

export default FoodSearch;
