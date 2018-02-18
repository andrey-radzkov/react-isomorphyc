import React from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import InfiniteScrollPage from "./pages/InfiniteScrollPage";
import NotFoundPage from "./pages/NotFoundPage";
import ReduxFormDemoPage from "./pages/ReduxFormDemoPage";
import Oauth2Login from "./pages/Oauth2Login";
import {PrivateRoute} from "./PrivateRoute";
import PushNotificationsPage from "./pages/PushNotificationsPage";

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <PrivateRoute exact path="/push" component={PushNotificationsPage}/>
      <PrivateRoute exact path="/redux-form" component={ReduxFormDemoPage}/>
      <PrivateRoute path="/redux-form/:id" component={ReduxFormDemoPage}/>
      <Route path="/infinite-scroll" component={InfiniteScrollPage}/>
      <Route path="/login" component={Oauth2Login}/>
      <Route path="*" component={NotFoundPage}/>
    </Switch>
  </div>

);

export default Routes;
