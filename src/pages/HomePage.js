import React from "react";
import {Link} from "react-router-dom";

const HomePage = () => (
  <div className="container">
    <h1>React Sandbox</h1>

    <h2>Get Started</h2>
    <ol>
      <li>Review the <Link to="redux-form">Redux form demo</Link></li>
      <li>Remove the demo and start coding: npm run remove-demo</li>
    </ol>
  </div>
);

export default HomePage;
