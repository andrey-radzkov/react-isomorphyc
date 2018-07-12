import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

export const WaitingLayer = ({waitingId, showWaiting}) => {
  let waitingLayer = null;
  if (showWaiting) {
    waitingLayer = (<div id={waitingId}><CircularProgress size={50}/></div>);
  }
  return waitingLayer;
};


WaitingLayer.propTypes = {
  waitingId: PropTypes.string,
  showWaiting: PropTypes.bool,
};
