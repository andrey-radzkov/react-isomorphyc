import React from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Oauth2Login from "./pages/Oauth2Login";
import {PrivateRoute} from "./PrivateRoute";
import ClothesPage from "./pages/ClothesPage";
import BasketPage from "./pages/BasketPage";

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <PrivateRoute exact path="/my-clothes" component={ClothesPage}/>
      <PrivateRoute exact path="/my-basket" component={BasketPage}/>
      <Route path="/login" component={Oauth2Login}/>
      <Route path="*" component={NotFoundPage}/>
    </Switch>
  </div>

);

export default Routes;
