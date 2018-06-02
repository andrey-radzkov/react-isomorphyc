import React from "react";
import PropTypes from "prop-types";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";

export const ReduxFormRadioGroup = ({input, submitOnChange, ...rest}) => (
  <RadioGroup
    {...input}
    {...rest}
    value={input.value}
    onChange={(e, data) => {
      input.onChange(e, data);
      setTimeout(submitOnChange, 0);
    }}
  />
);

ReduxFormRadioGroup.propTypes = {
  input: PropTypes.object,
  submitOnChange: PropTypes.func,
};
