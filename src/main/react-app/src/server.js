import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {browserHistory} from "react-router";
import App from "./components/App";
import StaticRouter from "react-router-dom/StaticRouter";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import ReactDOMServer from "react-dom/server";
import {createGenerateClassName, MuiThemeProvider} from "@material-ui/core/styles";
import {muiTheme} from "./theme";
import {SheetsRegistry} from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";
const sheetsRegistry = new SheetsRegistry();
const generateClassName = createGenerateClassName();
class ServerSideRender extends React.Component {
  constructor(props) {
    super(props);
    this.context = {store: {}};
  }


  render() {
    const content = ReactDOMServer.renderToString(<Provider store={this.props.store}>
      <StaticRouter location={this.props.location} context={this.context} basename={"app"}>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={muiTheme}>
            <App/>
          </MuiThemeProvider>
        </JssProvider>
      </StaticRouter>
    </Provider>);
    const css = sheetsRegistry.toString();
    const helmet = Helmet.renderStatic();

    return (

      <html lang="en">

      <head>

        <link rel="manifest" href="/app/manifest.json"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="application-name" content="Test react app"/>
        <meta name="apple-mobile-web-app-title" content="Test react app"/>
        <meta name="msapplication-starturl" content="/"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#009688"/>
        <style id="jss-server-side" dangerouslySetInnerHTML={{__html: css}}/>
        {helmet.meta.toComponent()}

        {helmet.title.toComponent()}


      </head>
      <body>
      <div id="app" dangerouslySetInnerHTML={{__html: content}}/>
      <noscript>
        <div className="container"><h2>Please, enable javascript for this application</h2></div>
      </noscript>
      <script async={true} src={"/" + this.props.script} charSet="UTF-8"/>
      </body>
      </html>
    );
  }
}

ServerSideRender.propTypes = {
  location: PropTypes.string,
  store: PropTypes.object,
  script: PropTypes.string,
};

export default ServerSideRender;

