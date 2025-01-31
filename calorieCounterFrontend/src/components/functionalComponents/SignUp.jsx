import React from 'react'
import "../../css/SignUp.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom';

const SignUp = ()=>{

  var [firstName, setFirstname] = useState("");
  var [lastName, setLastname] = useState("");
  var [username, setUsername] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var navigator = useNavigate();
  
  const handleSignup = async (event) => {
    event.preventDefault();
    console.log("Event Triggered");
    try {
      const req = await axios.post("http://localhost:3001/signup", {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      });
      console.log(req);
      if (req.data.signupStatus) {
        navigator("/home");
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
               Signup Form
            </div>
            <form onSubmit={handleSignup}>
            <div className="data">
                    <label htmlFor="name">FirstName</label>
                    <input type="text" name="firstName" placeholder="Enter your firstname"  onChange={(e) => setFirstname(e.target.value)} required/>
                </div>
                <div className="data">
                    <label htmlFor="name">LastName</label>
                    <input type="text" name="lastName" placeholder="Enter your lastname"  onChange={(e) => setLastname(e.target.value)} required/>
                </div>
                <div className="data">
                    <label htmlFor="username">UserName</label>
                    <input type="text" name="username" placeholder="Enter your username"  onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className="data">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="data">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type='submit' className="log-but">sumbit</button>
            </form>
            <Link to='/login' className='link2'>Already hava an account ? Login</Link>
        </div>
        </div>
  )
}
export default SignUp;