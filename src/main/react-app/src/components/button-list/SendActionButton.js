import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

export const SendActionButton = ({onClick, disabled, children}) => {

  return (
    <Button type="submit"
            color="primary"
            variant="raised"
            disabled={disabled}
            onClick={onClick}
    > {children}</Button>
  );
};

SendActionButton.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
};
