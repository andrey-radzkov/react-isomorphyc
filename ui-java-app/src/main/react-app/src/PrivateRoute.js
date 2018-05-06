import React from "react";
import PropTypes from "prop-types";

import {Route} from "react-router-dom";
import {authenticate, isAuthed} from "./oauth2/TokenService";

export const PrivateRoute = ({component: Component, ...rest}) => {
  let authed = isAuthed();
  if (authed !== true) {
    //TODO: think ABOUT MOVING TO app
    authenticate(rest.location);
  }

  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} /> : <div/>}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};
