import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
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
    open: false,
  };

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.setState({open: true});
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false});
  };

  render() {
    const {classes} = this.props;
//TODO: origin based on screen size
    return (
      <div><Button onClick={this.handleClick}>Open error snackbar</Button>

        {this.props.snacks && this.props.snacks.map((snack, index) => {
          return (
            <Snackbar key={"shack-" + index} id={"shack-" + index}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      open={true}
                      autoHideDuration={3000}
                      onClose={this.handleClose}
            >
              <SnackbarContent className={classes.error}
                               aria-describedby={"client-snackbar" + index}
                               message={
                                 <span id={"client-snackbar" + index}
                                       className={classes.message}>
                               <ErrorIcon
                                 className={classes.icon}/>{snack.message}</span>
                               }
                               action={[
                                 <IconButton key="close"
                                             aria-label="Close"
                                             color="inherit"
                                             className={classes.close}
                                             onClick={this.handleClose}>
                                   <CloseIcon/>
                                 </IconButton>
                               ]}
              >

              </SnackbarContent>
            </Snackbar>
          )
        })}

      </div>);
  }

}

ShackbarList.propTypes = {
  snacks: PropTypes.array,
};

const mapDispatchToProps = dispatch => {
  return {};
};
const mapStateToProps = (state) => {
  return {
    snacks: state.snackbarReducer.snacks
  };
};

ShackbarList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShackbarList);

export default withStyles(styles)(ShackbarList)


