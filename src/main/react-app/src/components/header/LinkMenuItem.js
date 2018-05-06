import React from "react";
import {Link} from "react-router-dom";
import {ListItemIcon, ListItemText} from "material-ui/List";
import PropTypes from "prop-types";
import ListItem from "material-ui/List/ListItem";

export const LinkMenuItem = ({onClick, leftIcon, to, primaryText}) => (
  <Link to={to} className="menu-item-link">
    <ListItem button onClick={onClick}>
      <ListItemIcon>{leftIcon}</ListItemIcon>
      <ListItemText inset primary={primaryText}/>
    </ListItem>
  </Link>
);

LinkMenuItem.propTypes = {
  onClick: PropTypes.func,
  leftIcon: PropTypes.object,
  to: PropTypes.string,
  primaryText: PropTypes.string,
};
