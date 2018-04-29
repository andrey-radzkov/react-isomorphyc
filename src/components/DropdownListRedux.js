import DropdownList from "react-widgets/lib/DropdownList";
import React from "react";
import "react-widgets/dist/css/react-widgets.css";
import PropTypes from "prop-types";
import {isClient} from "../utils/ssr-util";
if (isClient()) {
  //TODO: investigate build issue or migrate to material ui
  require('react-widgets/dist/css/react-widgets.css');
}
/**
 * I don`t know why, but it`s required
 * */
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
