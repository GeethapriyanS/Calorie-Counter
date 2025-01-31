const mdb= require('mongoose');
const signupSchema = mdb.Schema({
    firstName:String,
    lastName:String,
    username:String,
    email:String,
    password:String,
    calorieGoal: { type: Number, default: 0 },
});
const Signup = mdb.model("Signup",signupSchema);
module.exports = Signup;