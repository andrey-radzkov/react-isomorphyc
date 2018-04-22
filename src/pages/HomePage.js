import React from "react";
import Helmet from "react-helmet";
import {reduxForm} from "redux-form";
import {putClothes} from "../actions/clothesActions";
import Button from "react-bootstrap/lib/Button";
import {connect} from "react-redux";
import PropTypes from "prop-types";

let HomePage = ({pristine, reset, submitting, invalid, putClothes}) => (
  // TODO: move from home page
  <div className="container text-center">
    <Helmet title="Home page"
            meta={[
              {"name": "description", "content": "Персональный помощник в стирке"},
              {"name": "keywords", "content": "Гразные носки"},
            ]}
    />
    <h1>Персональный помощник в стирке</h1>
    <form className="form-horizontal" onSubmit={putClothes}>

      <Button bsStyle="success" className="submitClothes" type="submit" disabled={submitting}>В стирку!</Button>
    </form>
  </div>
);

HomePage.propTypes = {
  putClothes: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
};

HomePage = reduxForm({
  form: 'putClothes', // a unique identifier for this form
  // touchOnChange: true
  enableReinitialize: true,

})(HomePage);

const mapDispatchToProps = dispatch => {
  return {
    putClothes: (e) => {
      e.preventDefault();
      dispatch(putClothes());
    },
  };
};
const mapStateToProps = (state) => {
  return {};
};

HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
export default HomePage;
