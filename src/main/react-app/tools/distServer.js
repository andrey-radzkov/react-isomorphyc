import webpack from "webpack";
import Express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import path from "path";
import {Provider} from "react-redux";
import rootReducer from "../src/reducers";
import fs from "fs";
import compression from "compression";
import config from "../webpack/webpack.config.prod";
import http from "http";
import App from "../src/components/App";
import StaticRouter from "react-router-dom/StaticRouter";
import {createStore} from "redux";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
const compiler = webpack(config);
const app = new Express();
const port = process.env.PORT || 3000;

let initialState = {};
const store = createStore(rootReducer, initialState);

let options = {
  // key: fs.readFileSync('./tools/certificates/localhost_3000.key'),
  // cert: fs.readFileSync('./tools/certificates/localhost_3000.cert'),
  requestCert: false,
  rejectUnauthorized: false
};

app.use(compression());


app.use(Express.static(path.resolve(__dirname, '..', 'dist')));
// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  let context = {store: {}};
  let html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <MuiThemeProvider>
          <App/>
        </MuiThemeProvider>
      </StaticRouter>
    </Provider>
  );
  let readFileSync = fs.readFileSync(
    path.resolve(__dirname, '..', 'dist', 'index.html'), {encoding: "utf8"});

  readFileSync = readFileSync.replace("Loading...", html);
  //TODO: temp solution
  res.send(readFileSync);
  // res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});
//TODO: enable https, import correct certificates
//TODO: create proxy
// let server = https.createServer(options, app);
let server = http.createServer(app);
server.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info(
      "==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.",
      port, port);
  }
});
