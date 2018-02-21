import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {browserHistory} from "react-router";
import App from "./pages/App";
import StaticRouter from "react-router-dom/StaticRouter";
import PropTypes from "prop-types";

class ServerSideRender extends React.Component {
  constructor(props) {
    super(props);
    this.context = {store: {}};
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <StaticRouter location={this.props.location} context={this.context}>
          <App/>
        </StaticRouter>
      </Provider>
    );
  }
}

ServerSideRender.propTypes = {
  location: PropTypes.string,
  store: PropTypes.object,
};

export default ServerSideRender;

