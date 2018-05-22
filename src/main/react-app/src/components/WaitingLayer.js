import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

export const WaitingLayer = ({waitingId, showWaiting}) => {
  if (showWaiting) {
    return (<div id={waitingId}><CircularProgress size={50}/></div>);
  } else {
    return null;
  }
};


WaitingLayer.propTypes = {
  waitingId: PropTypes.string,
  showWaiting: PropTypes.bool,
};
