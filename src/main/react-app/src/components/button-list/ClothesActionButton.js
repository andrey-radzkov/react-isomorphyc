import React from "react";
import PropTypes from "prop-types";
import {Button} from "material-ui";

export const ClothesActionButton = ({clothesTypesWithCount, onSubmit, handleSubmit, disabled, className, type, color, children}) => {

  return (
    <Button type="submit"
            color={color}
            variant="raised"
            className={className}
            disabled={disabled}
            onClick={handleSubmit(values =>
              onSubmit({
                "type": {"name": type.name},
                "clothesTypes": clothesTypesWithCount
              })
            )}
    > {children}</Button>
  );
};

ClothesActionButton.propTypes = {
  clothesTypesWithCount: PropTypes.array,
  disabled: PropTypes.bool,
  type: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  className: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
};
