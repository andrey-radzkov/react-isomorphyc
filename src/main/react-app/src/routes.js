import React from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Oauth2Login from "./pages/Oauth2Login";
import {PrivateRoute} from "./PrivateRoute";
import SettingsPage from "./pages/SettingsPage";

const Routes = () => (
  <div>
    <Switch>
      <PrivateRoute exact path="/" component={HomePage}/>
      <PrivateRoute exact path="/settings" component={SettingsPage}/>
      <Route path="/login" component={Oauth2Login}/>
      <Route path="*" component={NotFoundPage}/>
    </Switch>
  </div>

);

export default Routes;
