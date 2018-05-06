import React from "react";
import {hydrate} from "react-dom";
import {Provider} from "react-redux";
import {browserHistory} from "react-router";
import App from "./pages/App";
import {BrowserRouter} from "react-router-dom";
import configureStore from "./store/configureStore";
import {isClient} from "./utils/ssr-util";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {muiTheme} from "./theme";
import JssProvider from "react-jss/lib/JssProvider";
import {create} from "jss";
import {createGenerateClassName, jssPreset} from "material-ui/styles";

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint =  document.getElementById('jss-insertion-point');
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
if (isClient()) {
  require('./styles/common-styles.scss');
  require('../static/favicon.ico');
  require('./service-worker-register.js');
}

const store = configureStore(preloadedState);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={muiTheme()}>
          <App />
        </MuiThemeProvider>
      </JssProvider>

    </BrowserRouter>
  </Provider>, document.getElementById('app')
);
