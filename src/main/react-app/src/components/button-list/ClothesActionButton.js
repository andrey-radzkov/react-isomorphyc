import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

export const ClothesActionButton = ({clothesTypesWithCount, onSubmit, handleSubmit, disabled, type, children}) => {

  return (
    <Button type="submit"
            color="primary"
            variant="raised"
            disabled={disabled}
            onClick={handleSubmit(values =>
              onSubmit({
                "type": {"name": type.name},
              })
            )}
    > {children}</Button>
  );
};

ClothesActionButton.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
};
