import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {browserHistory} from "react-router";
import App from "./pages/App";
import StaticRouter from "react-router-dom/StaticRouter";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import ReactDOMServer from "react-dom/server";
import {muiTheme} from "./theme";
import JssProvider from "react-jss/lib/JssProvider";
import {createGenerateClassName, MuiThemeProvider} from "material-ui/styles";
import {SheetsRegistry} from "react-jss/lib/jss";
class ServerSideRender extends React.Component {
  constructor(props) {
    super(props);
    this.context = {store: {}};
  }


  render() {
    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();

    const content = ReactDOMServer.renderToString(<Provider store={this.props.store}>
      <StaticRouter location={this.props.location} context={this.context}>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={muiTheme()}>
            <App/>
          </MuiThemeProvider>
        </JssProvider>
      </StaticRouter>
    </Provider>);
    const helmet = Helmet.renderStatic();

    return (

      <html lang="en">

      <head>

        <link rel="manifest" href="manifest.json"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="application-name" content="Test react app"/>
        <meta name="apple-mobile-web-app-title" content="Test react app"/>
        <meta name="msapplication-starturl" content="/"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#009688"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
        <noscript id="jss-insertion-point"/>
        {helmet.meta.toComponent()}

        {helmet.title.toComponent()}

        <style id="jss-server-side" dangerouslySetInnerHTML={{__html: sheetsRegistry}}/>
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

