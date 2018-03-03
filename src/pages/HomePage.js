import React from "react";
import {Link} from "react-router-dom";
import Helmet from "react-helmet";

const HomePage = () => (
  <div className="container">
    <Helmet title="Home page"
            meta={[
              {"name": "description", "content": "Home Page description"},
              {"name": "keywords", "content": "Home, react"},
            ]}
    />
    <h1>React Sandbox</h1>

    <h2>Get Started</h2>
    <ol>
      <li>Review the <Link to="redux-form">Redux form demo</Link></li>
      <li>Remove the demo and start coding: npm run remove-demo</li>
    </ol>
  </div>
);

export default HomePage;
