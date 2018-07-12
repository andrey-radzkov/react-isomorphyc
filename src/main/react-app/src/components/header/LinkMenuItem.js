import React from "react";
import Link from "react-router-dom/Link";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  menuItemLink: {
    textDecoration: "none",
  },
});
const LinkMenuItem = ({onClick, leftIcon, to, primaryText, classes}) => (
  <Link to={to} className={classes.menuItemLink}>
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(LinkMenuItem);
