import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import withStyles from "@material-ui/core/styles/withStyles";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import ErrorIcon from '@material-ui/icons/Error';
import {AUTO_CLOSE_INTERVAL, hideSnack} from "../../actions/snackbarAction";

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    marginBottom: theme.spacing.unit * 2,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    marginRight: theme.spacing.unit,
  },

});


class ShackbarList extends React.Component {
  state = {
    open: true,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Snackbar id={"shack-" + this.props.snack.type}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  open={this.props.snack.visible}
                  autoHideDuration={AUTO_CLOSE_INTERVAL}
                  onClose={this.props.closeSnackbar}
        >
          <SnackbarContent className={classes.error}
                           aria-describedby={"client-snackbar-"
                           + this.props.snack}
                           message={
                             <span id={"client-snackbar-" + this.props.snack}
                                   className={classes.message}>
                               <ErrorIcon
                                 className={classes.icon}/>{this.props.snack.message}</span>
                           }
                           action={[
                             <IconButton key="close"
                                         aria-label="Close"
                                         color="inherit"
                                         className={classes.close}
                                         onClick={this.props.closeSnackbar}>
                               <CloseIcon/>
                             </IconButton>
                           ]}
          >

          </SnackbarContent>
        </Snackbar>

      </div>);
  }

}

ShackbarList.propTypes = {
  snack: PropTypes.shape({
    message: PropTypes.string,
    visible: PropTypes.bool,
    type: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
  }),
};

const mapDispatchToProps = dispatch => {
  return {
    closeSnackbar: () => dispatch(hideSnack()),
  };
};
const mapStateToProps = (state) => {
  return {
    snack: state.snackbarReducer.snack
  };
};

ShackbarList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShackbarList);

export default withStyles(styles)(ShackbarList)


