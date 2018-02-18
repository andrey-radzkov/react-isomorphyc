import React from "react";
import {hydrate} from "react-dom";
import {Provider} from "react-redux";
import {browserHistory} from "react-router";
import App from "./pages/App";
import {BrowserRouter} from "react-router-dom";
import configureStore from "./store/configureStore";
import {isClient} from "./utils/ssr-util";
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
if (isClient()) {
  require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
  require('./styles/styles.scss');
  require('../static/favicon.ico');
  require('./service-worker-register.js');
}

const store = configureStore(preloadedState);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, document.getElementById('app')
);
