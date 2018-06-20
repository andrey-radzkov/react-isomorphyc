import React from "react";
import {hydrate} from "react-dom";
import {Provider} from "react-redux";
import {browserHistory} from "react-router";
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";
import configureStore from "./store/configureStore";
import {isClient} from "./utils/ssr-util";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {muiTheme} from "./theme";

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
if (isClient()) {
  require('./styles/common-styles.scss');
  require('../static/app/favicon.ico');
  require('./service-worker-register.js');
}

const store = configureStore(preloadedState);

hydrate(
  <Provider store={store}>
    <BrowserRouter basename={"app"}>
      <MuiThemeProvider theme={muiTheme}>
        <App/>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>, document.getElementById('app')
);
