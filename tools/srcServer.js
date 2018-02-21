// This file configures the development web server
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../webpack/webpack.config.dev";
import Express from "express";
import path from "path";
import ReactDOMServer from "react-dom/server";
import React from "react";
import fs from "fs";
import rootReducer from "../src/reducers";
import https from "https";
import {createStore} from "redux";
import proxy from "express-http-proxy";
import ServerSideRender from "../src/server";
global.__SERVER__ = true;
let options = {
  key: fs.readFileSync('./tools/certificates/server-key.pem'),
  cert: fs.readFileSync('./tools/certificates/server-csr.pem'),
  requestCert: false,
  rejectUnauthorized: false,
  passphrase: 'test'
};

const compiler = webpack(config);
const app = new Express();
const port = 3000;

app.use(webpackDevMiddleware(compiler,
  {
    noInfo: true, publicPath: config.output.publicPath, hot: true, inline: true,
    lazy: false
  }));
app.use(webpackHotMiddleware(compiler));

const apiProxy = proxy('http://localhost:9000', {preserveHostHdr: true});
app.use("/api", apiProxy);

const authProxy = proxy('http://localhost:9999', {
  preserveHostHdr: true, proxyReqPathResolver: function (req) {
    return "/uaa" + require('url').parse(req.url).path;
  }
});
app.use("/uaa", authProxy);
app.use(Express.static(path.join(__dirname, '..', 'static')));
//TODO: for first page too
app.use("*", (req, res) => {

  //TODO: load real suppliers async
  let initialState = {
    supplierListReducer: {
      suppliers: {
        content: [{
          companyName: "ololo",
          email: "ololo@email.com",
          id: "1"
        }]
      }
    }
  };
  const store = createStore(rootReducer, initialState);

  let html = ReactDOMServer.renderToString(
    <ServerSideRender location={req.originalUrl} store={store}/>
  );
  let readFileSync = fs.readFileSync(
    path.resolve(__dirname, '../src/index.ejs'), {encoding: "utf8"});
  readFileSync = readFileSync.replace('<div id="app"></div>', '<div id="app">' + html + '</div>');
  //TODO: temp solution
  readFileSync = readFileSync.replace("</noscript>",
    "</noscript>" +
    "<script>" +

    "window.__PRELOADED_STATE__ =" + JSON.stringify(initialState).replace(/</g, '\\u003c') + ";" +
    "</script>" +
    "<script type=\"text/javascript\" src=\"/bundle.js\" async=\"\"></script>");
  res.send(readFileSync);

  res.end();
});

//TODO: enable https, import correct certificates
//TODO: create proxy
let server = https.createServer(options, app);
//TODO: sign ceritficate
server.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info(
      "==> 🌎  Listening on port %s. Open up https://localhost:%s/ in your browser.",
      port, port);
  }
});
