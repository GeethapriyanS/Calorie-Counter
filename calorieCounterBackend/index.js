const express=require("express");
const mdb=require('mongoose');
const dotenv=require("dotenv");
const cors=require('cors');
const Signup =require('./models/signupSchema');
const Meal=require('./models/Meal');
const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt');
const axios=require('axios');
const app=express();

dotenv.config();
app.use(express.urlencoded());
app.use(express.json())
app.use(cors());

mdb.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDB Connection Sucessful")
}).catch((e)=>{
    console.log("MongoDB Connection Not Sucessful",e);
})

// const jwt = require("jsonwebtoken");
// const dotenv=require("dotenv");
// dotenv.config();
// module.exports = (req, res, next) => {
//     console.log("inside middleware")
//     const token = req.headers.authorization;

//     console.log(token);
//     if (!token) return res.status(401).json({ message: "Access Denied" });

//     try {
//         console.log("inside try");
//         const verified = jwt.verify(token, process.env.SECRET_KEY);
//         console.log(verified,"verified");
//         req.user = verified;
//     } catch (error) {
//         res.status(400).json({ message: "Invalid Token" });
//     }
//     next();
// };

app.post("/signup", async (req, res) => {
    try {
        var {firstName,lastName,username,email,password}=req.body;
        console.log(req.body);
        var hashedPassword=await bcrypt.hash(password,10);
        console.log(hashedPassword);
        var user = new Signup({
        firstName:firstName,
        lastName:lastName,
        username:username,
        email:email,
        password:hashedPassword,
    });
    user.save();
    res.status(201).json({response:"Signup Successful",signupStatus:true,email:user.email});
    } catch (err) {
        res.status(500).json({ response: "Error creating user",signupStatus:false,email:null });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Signup.findOne({ email });
        if (!user) return res.status(200).json({ message: "User not found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(200).json({ message: "Invalid credentials"});
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        console.log(token);
        res.status(200).json({ message: "Login successful", Loginstatus:true ,token:token,email:user.email});
    } catch (err) {
        res.status(500).json({ message: "Internal server error", Loginstatus:false});
    }
});


app.post("/add-meal", async (req, res) => {
    try {
        const { query, email } = req.body; 

        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await Signup.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const apiRes = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
            headers: { "X-Api-Key": process.env.CALORIE_NINJAS_API_KEY }
        });

        const mealData = apiRes.data.items[0];
        if (!mealData) return res.status(404).json({ message: "No data found for this query" });


        const newMeal = new Meal({
            name: query,
            calories: mealData.calories,
            protein: mealData.protein_g,
            carbs: mealData.carbohydrates_total_g,
            fats: mealData.fat_total_g,
            user: user._id,
            date: new Date()  
        });

        await newMeal.save();
        await Signup.findByIdAndUpdate(user._id, { $push: { meals: newMeal._id } });

        res.status(201).json({ message: "Meal added successfully", meal: newMeal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching meal data" });
    }
});


app.get("/get-meal", async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await Signup.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        await Meal.deleteMany({ user: user._id, date: { $lt: today } });

        const meals = await Meal.find({ user: user._id, date: { $gte: today } });

        const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

        res.status(200).json({ meals, totalCalories });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving meals" });
    }
});

app.delete("/delete-meal/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const meal = await Meal.findById(id);
        if (!meal) return res.status(404).json({ message: "Meal not found" });

        await Meal.findByIdAndDelete(id);
        res.status(200).json({ message: "Meal deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting meal" });
    }
});

app.put("/edit-meal/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, calories, protein, carbs, fats } = req.body;

        const updatedMeal = await Meal.findByIdAndUpdate(
            id,
            { name, calories, protein, carbs, fats },
            { new: true }
        );

        if (!updatedMeal) return res.status(404).json({ message: "Meal not found" });

        res.status(200).json({ message: "Meal updated successfully", meal: updatedMeal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating meal" });
    }
});


app.post("/set-goal", async (req, res) => {
    try {
        const { email, goal } = req.body;

        if (!email || !goal) return res.status(400).json({ message: "Missing parameters" });

        await Signup.findOneAndUpdate({ email }, { $set: { calorieGoal: goal } });

        res.status(200).json({ message: "Goal updated successfully", goal });
    } catch (error) {
        console.error("Error setting goal:", error);
        res.status(500).json({ message: "Error setting goal" });
    }
});

app.get("/get-goal", async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await Signup.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ goal: user.calorieGoal || 0 });
    } catch (error) {
        console.error("Error fetching goal:", error);
        res.status(500).json({ message: "Error retrieving goal" });
    }
});

app.get("/get-total-calories", async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await Signup.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const meals = await Meal.find({ user: user._id, date: { $gte: today } });
        const totalCalories1 = meals.reduce((sum, meal) => sum + meal.calories, 0);

        res.status(200).json({totalCalories1});
    } catch (error) {
        console.error("Error fetching total calories:", error);
        res.status(500).json({ message: "Error retrieving total calories" });
    }
});

app.listen(3001,()=>{
    console.log("Server Started");
});
