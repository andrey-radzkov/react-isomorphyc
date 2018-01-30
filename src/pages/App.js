import React from "react";
import PropTypes from "prop-types";
import Routes from "../routes";
import Header from "../components/Header";

const App = () => (
  <div>
    <Header path="curr"/>
    <Routes/>
  </div>
);


App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object
};

export default App;
