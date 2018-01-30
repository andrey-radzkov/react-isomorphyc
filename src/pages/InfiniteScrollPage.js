import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/infinite-scroll.scss';

// Since this component is simple and static, there's no parent container for it.
const InfiniteScrollPage = () => {
  return (
    <div className="container">
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
