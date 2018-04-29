import DropdownList from "react-widgets/lib/DropdownList";
import React from "react";
import PropTypes from "prop-types";
//TODO: fix build issue

const DropdownListRedux = ({input, data, valueField, textField, ...rest}) => (
  <DropdownList  {...input}
                 onBlur={() => input.onBlur()}
                 data={data}
                 valueField={valueField}
                 textField={textField}
                 className="select-dropdown"
                 {...rest}
  />
);
DropdownListRedux.propTypes = {
  input: PropTypes.object,
  data: PropTypes.array,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  defaultValue: PropTypes.string,
};
export default DropdownListRedux;
