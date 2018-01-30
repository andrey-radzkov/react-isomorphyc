import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/lib/Col";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Popover from "react-bootstrap/lib/Popover";
import FormGroup from "react-bootstrap/lib/FormGroup";

export const TextInputRedux = ({input, label, type, placeholder, meta: {dirty, visited, pristine, touched, error, warning}}) => (

  <FormGroup validationState={touched ? ( error ? "error" : (warning ? "warning"
    : "success")) : null}>
    <Col componentClass={ControlLabel} sm={4}>{label}</Col>
    <Col sm={8}>
      <FormControl
        type="text"
        placeholder={placeholder}
        {...input}
      />

      {touched && (error || warning) ? <Popover
        id="popover-basic"
        placement="right"
        positionTop={-5 * ([error].length - 1)}>
        {error || warning}

      </Popover> : ''}
    </Col>
  </FormGroup>
);

TextInputRedux.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object,
};

