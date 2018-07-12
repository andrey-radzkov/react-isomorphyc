import React from "react";
import {Route} from "react-router-dom/Route";
import {Switch} from "react-router-dom/Switch";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Oauth2Login from "./pages/Oauth2Login";
import {PrivateRoute} from "./PrivateRoute";

const Routes = () => (
  <div>
    <Switch>
      <PrivateRoute exact path="/" component={HomePage}/>
      <Route path="/login" component={Oauth2Login}/>
      <Route path="*" component={NotFoundPage}/>
    </Switch>
  </div>

);

export default Routes;
