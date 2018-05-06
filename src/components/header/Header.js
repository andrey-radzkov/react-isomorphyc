import React from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import {Link} from "react-router-dom";
import {isClient} from "../../utils/ssr-util";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Typography, withStyles} from "material-ui";
import ExitToApp from "@material-ui/icons/ExitToApp";
import {getAccessToken, logout} from "../../oauth2/TokenService";
import {LeftMenu} from "./LeftMenu";
if (isClient()) {
  require('./header.scss');
}

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
  appBarLink: {
    color: "#fff",
    textDecoration: "none",
    '&:hover':{
      color: "#fff !important"
    }
  }
};


class Header extends React.Component {
//tODO: migrate to reactstrap
  constructor(props) {
    super(props);
    this.state = {
      left: false,
    };
  }

  componentDidMount(){
    //TODO: It`s necessary. this need afetr fix Warning: Prop `className` did not match.
    // TODO: Server: "MuiSvgIcon-root-49" Client: "MuiSvgIcon-root-52"
    // const jssStyles = document.getElementById('jss-server-side');
    // if (jssStyles && jssStyles.parentNode) {
    //   jssStyles.parentNode.removeChild(jssStyles);
    // }
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
            <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)} color="inherit"
                        aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link to="/" className={classes.appBarLink}>Время стирки</Link>
            </Typography>
            {getAccessToken() !== null && (<ExitToApp style={iconStyles} onClick={logout}/>)}
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
