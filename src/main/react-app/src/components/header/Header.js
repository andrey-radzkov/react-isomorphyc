import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import {Link} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Typography, withStyles} from "@material-ui/core";
import ExitToApp from "@material-ui/icons/ExitToApp";
import {getAccessToken, logout} from "../../services/oauth2/TokenService";
import {LeftMenu} from "./LeftMenu";

const iconStyles = {
  cursor: "pointer",
};
const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class Header extends React.Component {
//tODO: migrate to reactstrap
  constructor(props) {
    super(props);
    this.state = {
      left: false,
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton}
                        onClick={this.toggleDrawer('left', true)}
                        color="inherit"
                        aria-label="Menu">
              <MenuIcon/>
            </IconButton>
            <Typography variant="title" color="inherit"
                        className={classes.flex}>
              <Link to="/" className="app-bar-link">Время стирки</Link>
            </Typography>
            {getAccessToken() !== null && (
              <ExitToApp style={iconStyles} onClick={logout}/>)}
            {/*TODO: logo*/}
            <LeftMenu open={this.state.left}
                      onClose={this.toggleDrawer('left', false)}
                      onOpen={this.toggleDrawer('left', true)}/>
          </Toolbar>
        </AppBar>
      </div>

    );
  }
}

Header.propTypes = {
  path: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
