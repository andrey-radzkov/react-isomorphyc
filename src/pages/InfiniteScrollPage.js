import React from "react";
import {Link} from "react-router-dom";
import Helmet from "react-helmet";
import {isClient} from "../utils/ssr-util";
if (isClient()) {
  require('../styles/infinite-scroll.scss');
}

// Since this component is simple and static, there's no parent container for it.
const InfiniteScrollPage = () => {
  return (
    <div className="container">
      <Helmet title="Infinite scroll Page"
              meta={[
                {"name": "description", "content": "Infinite scroll Page description"},
                {"name": "keywords", "content": "Infinite scroll"},
              ]}
      />
      <h2 className="alt-header">Infinite scroll</h2>
      <p>
        This example app for demos. This page is for infinite scroll.
      </p>
      <p>
        <Link to="/badlink">Click this bad link</Link> to see the 404 page.
      </p>
    </div>
  );
};

export default InfiniteScrollPage;
