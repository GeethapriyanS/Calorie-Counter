const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
module.exports = (req, res, next) => {
    console.log("inside middleware")
    const token = req.headers.authorization;

    console.log(token);
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        console.log("inside try");
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verified,"verified");
        req.user = verified;
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
    next();
};