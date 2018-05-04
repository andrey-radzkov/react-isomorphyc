import React from "react";
import PropTypes from "prop-types";
import MenuItem from "material-ui/MenuItem";
import {Link} from "react-router-dom";

export const LinkMenuItem = ({onClick, leftIcon, to, primaryText}) => (
  <MenuItem onClick={onClick} leftIcon={leftIcon} containerElement={<Link to={to}/>} primaryText={primaryText}/>
);

LinkMenuItem.propTypes = {
  onClick: PropTypes.func,
  leftIcon: PropTypes.object,
  to: PropTypes.string,
  primaryText: PropTypes.string,
};
