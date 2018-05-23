import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";

export const ReduxFormCheckbox = ({input}) => (
  <Checkbox
    checked={!!input.value}
    onChange={input.onChange}
  />
);
ReduxFormCheckbox.propTypes = {
  input: PropTypes.object,
};
