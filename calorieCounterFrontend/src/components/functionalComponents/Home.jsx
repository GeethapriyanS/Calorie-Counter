import React from "react";
import Navbar from "./Navbar";
import "../../css/Home1.css"
import image1 from "../../assets/back5.png";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div>
        <Navbar />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Calorie Counter: Log Meals & Track Your Health</h1>
        <p className="home-description">
          Stay on top of your nutrition! Easily log meals, track calorie intake, and maintain a 
          healthy lifestyle with our intuitive calorie counter.
        </p>

        <div className="home-image-container">
          <img
            src={image1}
            alt="Healthy Food"
            className="home-image"
          />
        </div>

        <Link to='/meals'><button className="home-btn">Create logs</button></Link>
      </div>
    </div>
    </div>
  );
};

export default Home;
