import React from "react";
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
import withStyles from "@material-ui/core/styles/withStyles";

const sheetsRegistry = new SheetsRegistry();
const generateClassName = createGenerateClassName();

const styles = theme => ({
  root: {
    minWidth: "230px",
    margin: "0 auto",
    background: "#fafafa",
  },
});

@withStyles(styles, {withTheme: true})
export default class ServerSideRender extends React.Component {
  static propTypes = {
    location: PropTypes.string,
    store: PropTypes.object,
    script: PropTypes.string,
    classes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.context = {store: {}};
  }


  render() {
    const {classes} = this.props;
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
      <body className={classes.root}>
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
