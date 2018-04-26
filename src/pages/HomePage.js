import React from "react";
import Helmet from "react-helmet";
import {Field, reduxForm} from "redux-form";
import {putClothes} from "../actions/clothesActions";
import Button from "react-bootstrap/lib/Button";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import DropdownListRedux from "../components/DropdownListRedux";
import {required} from "../validators/validatorsForFormat";


let HomePage = ({pristine, reset, handleSubmit, submitting, invalid, putClothes}) => (
  // TODO: move from home page
  <div className="container text-center">
    <Helmet title="Home page"
            meta={[
              {"name": "description", "content": "Персональный помощник в стирке"},
              {"name": "keywords", "content": "Гразные носки"},
            ]}
    />
    <h1>Положите вещь в стирку</h1>
    <form className="form-horizontal" onSubmit={handleSubmit(putClothes)}>
      {/*//TODO: select data from server, default value from redux*/}

      <Field name="type"
             component={DropdownListRedux}
             data={[
               {type: 'socks', text: 'Носки'}
               , {type: 't-shirt', text: 'Майки'}
               , {type: 'trousers', text: 'Штаны'}
               , {type: 'others', text: 'Остальные вещи'}
             ]}
             valueField="type"
             textField="text"
             validate={[required]}
      />
      <Button bsStyle="success" className="submitClothes" type="submit" disabled={submitting}>В стирку!</Button>
    </form>
  </div>
);

HomePage.propTypes = {
  putClothes: PropTypes.func,
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
};

HomePage = reduxForm({
  form: 'putClothes',
  enableReinitialize: true,

})(HomePage);

const mapDispatchToProps = dispatch => {
  return {
    putClothes: (values) => {
      return dispatch(putClothes(values));
    },
  };
};
const mapStateToProps = (state) => {
  //TODO: to state
  return {initialValues: {"type": {"type": "socks"}}};
};

HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
export default HomePage;
