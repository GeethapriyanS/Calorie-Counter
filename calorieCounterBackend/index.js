const express=require("express");
const mdb=require('mongoose');
const dotenv=require("dotenv");
const cors=require('cors');
const mealRoutes = require("./routes/mealRoutes");
const authRoutes = require("./routes/authRoutes");
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

app.use("/api/meals", mealRoutes);
app.use("/api/auth", authRoutes);

app.listen(3001,()=>{
    console.log("Server Started");
});
