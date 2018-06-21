import React from "react";
import Routes from "../routes";
import Header from "./header/Header";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/";
import FirebaseMessaging from "../services/push-notification/FirebaseMessaging";
import ShackbarList from "./snackbar/ShackbarList";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit,
  },

  align: {
    textAlign: "center",
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);

    new FirebaseMessaging().getMessaging();
  }

  render() {
    const {classes} = this.props;
    return (<div>
      <Header path="curr"/>
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} lg={4}/>
          <Grid item xs={12} lg={4} className={classes.align}>
            <Routes/>
          </Grid>
          <Grid item xs={12} lg={4}/>
        </Grid>
      </div>
      <ShackbarList/>
    </div>);
  }
}


App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object,
  classes: PropTypes.object.isRequired,

};
export default withStyles(styles, {withTheme: true})(App);
