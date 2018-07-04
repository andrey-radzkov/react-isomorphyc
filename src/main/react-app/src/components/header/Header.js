import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import {Link} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import ExitToApp from "@material-ui/icons/ExitToApp";
import {getAccessToken, logout} from "../../services/oauth2/TokenService";
import {LeftMenu} from "./LeftMenu";

const iconStyles = {
  cursor: "pointer",
};
const styles = theme => ({
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
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
    '&:hover': {
      color: theme.palette.primary.contrastText
    }
  }
});

@withStyles(styles, {withTheme: true})
export default class Header extends React.Component {
  static propTypes = {
    path: PropTypes.string,
    classes: PropTypes.object.isRequired,
  };

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

            <Typography variant="title" color="inherit"
                        className={classes.flex}>
              <Link to="/" className={classes.appBarLink}>Время стирки</Link>
            </Typography>
            {getAccessToken() !== null && (
              <ExitToApp style={iconStyles} onClick={logout}/>)}
            {/*TODO: logo*/}
            {/*<LeftMenu open={this.state.left}*/}
                      {/*onClose={this.toggleDrawer('left', false)}*/}
                      {/*onOpen={this.toggleDrawer('left', true)}/>*/}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
