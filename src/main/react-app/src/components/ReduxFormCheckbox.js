import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";

export const ReduxFormCheckbox = ({input, submitOnChange}) => (
  <Checkbox
    checked={!!input.value}
    onChange={(e, data) => {
      input.onChange(e, data);
      setTimeout(submitOnChange, 0);
    }}
  />
);

ReduxFormCheckbox.propTypes = {
  input: PropTypes.object,
};
