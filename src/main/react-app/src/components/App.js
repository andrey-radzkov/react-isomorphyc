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
    textAlign: "center",
  },
  column: {
    margin: theme.spacing.unit,
  }
});

@withStyles(styles, {withTheme: true})
export default class App extends React.PureComponent {
  static propTypes = {
    children: PropTypes.element,
    location: PropTypes.object,
    classes: PropTypes.object.isRequired,

  };

  constructor(props) {
    super(props);

    new FirebaseMessaging().getMessaging();
  }

  render() {
    const {classes} = this.props;
    return (<div>
      <Header path="curr"/>
      <div>
        <Grid container
              direction="row"
              justify="center"
              alignItems="center" className={classes.root}>
          <Grid item xs={12} sm={6} md={4} lg={4} className={classes.column}>
            <Routes/>
          </Grid>
        </Grid>
      </div>
      <ShackbarList/>
    </div>);
  }
}
