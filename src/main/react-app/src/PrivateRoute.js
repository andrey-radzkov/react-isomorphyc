import React from "react";
import PropTypes from "prop-types";

import {Route} from "react-router-dom";
import {isAuthed, redirectToAuthService} from "./oauth2/TokenService";
import {Button} from "material-ui";

export const PrivateRoute = ({component: Component, ...rest}) => {
  let authed = isAuthed();


  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} /> : <div><h1>Пожалуйста, войдите</h1>
          <Button variant="raised" color="primary" onClick={redirectToAuthService}>Тестовый логин</Button></div>
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};
