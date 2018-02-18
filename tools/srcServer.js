// This file configures the development web server
// which supports hot reloading and synchronized testing.
// Require Browsersync along with webpack and middleware for it
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../webpack/webpack.config.dev";
import Express from "express";
import path from "path";
import ReactDOMServer from "react-dom/server";
import React from "react";
import http from "http";
import fs from "fs";
import {Provider} from "react-redux";
import rootReducer from "../src/reducers";

import {createStore} from "redux";
import StaticRouter from "react-router-dom/StaticRouter";
import App from "../src/pages/App";
import proxy from "express-http-proxy";

let options = {
  key: fs.readFileSync('./tools/certificates/server-key.pem'),
  cert: fs.readFileSync('./tools/certificates/server-csr.pem'),
  requestCert: false,
  rejectUnauthorized: false
};

const compiler = webpack(config);
const app = new Express();
const port = 3000;

//TODO: impl const preloadedState = window.__PRELOADED_STATE__
let initialState = {supplierListReducer: {suppliers: {content: [{companyName: "ololo", email: "ololo@email.com"}]}}};
const store = createStore(rootReducer, initialState);

app.use(webpackDevMiddleware(compiler,
  {
    noInfo: true, publicPath: config.output.publicPath, hot: true, inline: true,
    lazy: false
  }));
app.use(webpackHotMiddleware(compiler));

const apiProxy = proxy('http://localhost:9100', {preserveHostHdr: true});
app.use("/api", apiProxy);

const authProxy = proxy('http://localhost:19979', {
  preserveHostHdr: true, proxyReqPathResolver: function (req) {
    return "/uaa" + require('url').parse(req.url).path;
  }
});
app.use("/uaa", authProxy);
app.use(Express.static(path.join(__dirname, '..', 'static')));
//TODO: for first page too
app.use("*", (req, res) => {
//TODO: connect history
  let context = {store: {}};
  let html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.originalUrl} context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  );
  let readFileSync = fs.readFileSync(
    path.resolve(__dirname, '../src/index.ejs'), {encoding: "utf8"});
  readFileSync = readFileSync.replace('<div id="app"></div>', '<div id="app">' + html + '</div>');
  //TODO: temp solution
  readFileSync = readFileSync.replace("</noscript>",
    "</noscript><script type=\"text/javascript\" src=\"/bundle.js\" async=\"\"></script>");
  res.send(readFileSync);

  res.end();
});

//TODO: enable https, import correct certificates
//TODO: create proxy
//let server = https.createServer(options, app);
//TODO: sign ceritficate
let server = http.createServer(app);
// server.listen(port, function (error) {
app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info(
      "==> 🌎  Listening on port %s. Open up https://localhost:%s/ in your browser.",
      port, port);
  }
});
