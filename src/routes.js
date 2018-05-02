import React from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ReduxFormDemoPage from "./pages/ReduxFormDemoPage";
import Oauth2Login from "./pages/Oauth2Login";
import {PrivateRoute} from "./PrivateRoute";
import PushNotificationsPage from "./pages/PushNotificationsPage";
import ClothesPage from "./pages/ClothesPage";
import BasketPage from "./pages/BasketPage";

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <PrivateRoute exact path="/my-clothes" component={ClothesPage}/>
      <PrivateRoute exact path="/my-basket" component={BasketPage}/>
      <PrivateRoute exact path="/push" component={PushNotificationsPage}/>
      <PrivateRoute exact path="/redux-form" component={ReduxFormDemoPage}/>
      <PrivateRoute path="/redux-form/:id" component={ReduxFormDemoPage}/>
      <Route path="/login" component={Oauth2Login}/>
      <Route path="*" component={NotFoundPage}/>
    </Switch>
  </div>

);

export default Routes;
