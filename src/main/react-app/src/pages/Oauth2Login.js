import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import {requestToken} from "../oauth2/TokenService";
import {registerIfNecessary} from "../actions/clothesActions";
import {connect} from "react-redux";

class Oauth2Login extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let getParameters = queryString.parse(this.props.location.search);
    requestToken(getParameters.code, this.props.history).then(data => {
      this.props.registerIfNecessary();
    });
  }

  render() {
    return (
      <div/>
    );
  }

}

Oauth2Login.propTypes = {
  registerIfNecessary: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapDispatchToProps = dispatch => {
  return {
    registerIfNecessary: () => {
      dispatch(registerIfNecessary());
    },
  };
};
const mapStateToProps = (state) => {
  return {};
};

Oauth2Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Oauth2Login);

export default Oauth2Login;
