import React from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {TextInputRedux} from "../components/TextInputRedux";
import Button from "react-bootstrap/lib/Button";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Col from "react-bootstrap/lib/Col";
import {
  aol,
  email,
  maxLength15,
  minValue18,
  number,
  required,
  tooOld
} from "../validators/validatorsForFormat";


let FieldLevelValidationForm = ({
  onSubmit, pristine, reset, submitting, invalid, id
}) => {
  return (
    <div>
      <h2>Redux validation for supplier {id}</h2>
      <form className="form-horizontal" onSubmit={onSubmit}>
        <Field name="companyName" type="text"
               component={TextInputRedux} label="companyName"
               validate={[required, maxLength15]}
        />
        <Field name="email" type="email"
               component={TextInputRedux} label="Email"
               validate={email}
               warn={aol}
        />
        <Field name="referenceId" type="number"
               component={TextInputRedux} label="Reference  Id"
               validate={[required, number, minValue18]}
               warn={tooOld}
        />
        <Field name="duns" type="number"
               component={TextInputRedux} label="Duns" placeholder="Duns"
               validate={[required]}
               warn={tooOld}
        />
        <Col sm={8} smOffset={4}>
          <ButtonToolbar>
            <Button bsStyle="primary" type="submit"
                    disabled={pristine || invalid || submitting}>Save</Button>
            <Button bsStyle="default" type="button"
                    disabled={pristine || submitting}
                    onClick={reset}>Reset</Button>
          </ButtonToolbar>
        </Col>
        <div className="clearfix"/>

      </form>
    </div>
  );
};


FieldLevelValidationForm.propTypes = {
  onSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  id: PropTypes.number,
};

FieldLevelValidationForm = reduxForm({
  form: 'fieldLevelValidation', // a unique identifier for this form
  // touchOnChange: true
  enableReinitialize: true,

})(FieldLevelValidationForm);

FieldLevelValidationForm = connect(
  state => ({
    initialValues: state.supplierReducer.data
  })
)(FieldLevelValidationForm);

export default FieldLevelValidationForm;
