const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Signup" },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meal", MealSchema);