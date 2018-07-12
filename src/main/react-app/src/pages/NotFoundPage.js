import React from "react";
import {Link} from "react-router-dom/Link";
import Helmet from "react-helmet";

const NotFoundPage = () => {
  return (
    <div className="container">
      <Helmet title="Not found"/>

      <h4>
        404 Page Not Found
      </h4>
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
};

export default NotFoundPage;
