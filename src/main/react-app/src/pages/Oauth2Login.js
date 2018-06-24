import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import {registerIfNecessary, requestToken, requestVkToken} from "../services/oauth2/TokenService";
import {connect} from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    registerIfNecessary: () => {
      return dispatch(registerIfNecessary());
    },
    requestVkToken: (code) => {
      return dispatch(requestVkToken(code));
    }
  };
};
const mapStateToProps = (state) => {
  return {};
};
@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Oauth2Login extends React.Component {
  static   propTypes = {
    registerIfNecessary: PropTypes.func,
    location: PropTypes.object,
    history: PropTypes.object,
    dispatch: PropTypes.func,
    requestVkToken: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let getParameters = queryString.parse(this.props.location.search);
    const isVk = this.props.location.pathname.indexOf("vk") > 0;
    if (isVk) {
      this.props.requestVkToken(getParameters.code).then(
        (targetUrl) => {
          this.props.registerIfNecessary().then(() => {
            this.props.history.push(targetUrl)
          });
        });
    } else {
      requestToken(getParameters.code).then(() => {
        this.props.registerIfNecessary().then(() => {
          this.props.history.push(targetUrl)
        });
      });
    }
  }

  render() {
    return (
      <div/>
    );
  }

}
