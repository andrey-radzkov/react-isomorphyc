// This file configures the development web server
import webpack from "webpack";
import Express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import path from "path";
import rootReducer from "../src/reducers";
import compression from "compression";
import config from "../webpack/webpack.config.prod";
import http from "http";
import {createStore} from "redux";
import proxy from "express-http-proxy";
import ServerSideRender from "../src/server";
const compiler = webpack(config);
const app = new Express();
const port = process.env.PORT || 3000;
global.__SERVER__ = true;
global.__SERVER__ = true;

//TODO: generate bundle for using without babel
let initialState = {};

let options = {
  // key: fs.readFileSync('./tools/certificates/localhost_3000.key'),
  // cert: fs.readFileSync('./tools/certificates/localhost_3000.cert'),
  requestCert: false,
  rejectUnauthorized: false
};

app.use(compression());
const apiProxy = proxy('https://backend-for-react-resource.herokuapp.com', {preserveHostHdr: true});
app.use("/api", apiProxy);

const authProxy = proxy('https://backend-for-react-authserver.herokuapp.com', {
  preserveHostHdr: true, proxyReqPathResolver: function (req) {
    return "/uaa" + require('url').parse(req.url).path;
  }
});
app.use("/uaa", authProxy);

app.use(Express.static(path.resolve(__dirname, '..', 'dist')));
// Always return the main index.html, so react-router render the route in the client
app.use("*", (req, res) => {

  //TODO: load real suppliers async
  let initialState = {
    clothesReducer: {clothes: [], basket: {}}
  };
  const store = createStore(rootReducer, initialState);

  let html = ReactDOMServer.renderToString(
    <ServerSideRender location={req.originalUrl} store={store} script={config.output.filename}/>
  );
  //TODO: temp solution
  html = html.replace("</noscript>",
    "</noscript>" +
    "<script>" +

    "window.__PRELOADED_STATE__ =" + JSON.stringify(initialState).replace(/</g, '\\u003c') + ";" +
    "</script>");
  res.send('<!DOCTYPE html>' + html);

  res.end();
});
//TODO: enable https, import correct certificates
//TODO: create proxy
// let server = https.createServer(options, app);
console.log("will Listening on port " + port);
let server = http.createServer(app);
server.listen(port, '0.0.0.0',  function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info(
      "==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.",
      port, port);
  }
});
