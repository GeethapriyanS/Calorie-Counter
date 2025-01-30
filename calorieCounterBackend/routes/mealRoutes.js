const express = require("express");
const router = express.Router();
const Meal = require("../models/Meal");
const Signup = require("../models/signupSchema");
const auth = require("./authMiddleware");
const axios = require("axios");

// router.get("/api/meals", async (req, res) => {
//     try {
//         const meals = await Meal.find({ userId: req.user.id }); 
//         res.status(200).json(meals);
//     } catch (error) {
//         res.status(500).json({ message: "Server error fetching meals" });
//     }
// });

router.post("/add", auth, async (req, res) => {
    try {
        const { query } = req.body;

        const apiRes = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`, {
            headers: { "X-Api-Key": process.env.CALORIE_NINJAS_API_KEY }
        });

        const mealData = apiRes.data.items[0];
        if (!mealData) return res.status(404).json({ message: "No data found for this query" });

        const newMeal = new Meal({
            name: mealData.name,
            calories: mealData.calories,
            protein: mealData.protein_g,
            carbs: mealData.carbohydrates_total_g,
            fats: mealData.fat_total_g,
            user: req.user.id 
        });

        await newMeal.save();

        await Signup.findByIdAndUpdate(req.user.id, { $push: { meals: newMeal._id } });

        res.json(newMeal);
    } catch (err) {
        res.status(500).json({ message: "Error fetching meal data" });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const meals = await Meal.find({ user: req.user.id }).sort({ date: -1 });
        res.json(meals);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving meals" });
    }
});

module.exports = router;
