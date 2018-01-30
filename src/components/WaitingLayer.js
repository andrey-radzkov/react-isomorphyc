import React from "react";
import PropTypes from "prop-types";

export const WaitingLayer = ({waitingId, showWaiting}) => {
  if (showWaiting) {
    return (<div>Loading...</div>);
  } else {
    return null;
  }
};


WaitingLayer.propTypes = {
  waitingId: PropTypes.string,
  showWaiting: PropTypes.bool,
};
