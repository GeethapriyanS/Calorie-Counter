const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Signup = require("../models/signupSchema");

router.post("/signup", async (req, res) => {
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
    res.status(201).json({response:"Signup Successful",signupStatus:true});
    } catch (err) {
        res.status(500).json({ response: "Error creating user",signupStatus:false });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Signup.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        console.log(token);
        res.status(201).json({ message: "Login successful", Loginstatus:true ,token:token});
    } catch (err) {
        res.status(500).json({ message: "Internal server error", Loginstatus:false});
    }
});


// app.post('/login',async (req,res)=>{
//     var {email,password}= req.body;
//     console.log(req.body);
//     try{ 
//     var user=await Signup.findOne({email});
//     if (!user) {
//         return res.status(404).json({ message: "User not found" });
//     }
//     const payload={
//         email:user.email,
//         username:user.username
//     }
//     const token=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1hr"});
//     console.log(token);
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return res.status(401).json({ message: "Invalid password" });
//     }
//     console.log("inside try");
//     res.status(201).json({ message: "Login successful", Loginstatus:true ,token:token});
//     } catch (error) {
//     console.error(error);
//     console.log("inside catch");
//     res.status(500).json({ message: "Internal server error" });
// }});

module.exports = router;