import React from 'react'
import { useState } from 'react';
import "../../css/SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";

const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    var navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("Event Triggered");
        try {
          const req = await axios.post("http://localhost:3001/login", {
            email: email,
            password: password,
          });
          console.log(req);
          alert(req.data.message);
          if (req.data.Loginstatus) {
            navigate("/home");
            localStorage.setItem("userEmail", req.data.email);
          }
        } catch (err) {
          console.log(err);
        }
    };
  return(
   <div className="body">
     <div className="center">
            <div className="text">
               Login Form
            </div>
            <form onSubmit={handleLogin}>
                <div className="data">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="data">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" placeholder="Enter your password"  onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button className="log-but" type='submit'>Login</button>
            </form>
            <Link to="/" className='link2'>create new account ? Signup</Link>
        </div>
        </div>
  )
}
export default Login;