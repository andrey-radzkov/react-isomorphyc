import React from "react";
import PropTypes from "prop-types";
import connect from "react-redux/lib/connect/connect";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import withStyles from "@material-ui/core/styles/withStyles";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import ErrorIcon from '@material-ui/icons/Error';
import {
  AUTO_CLOSE_INTERVAL,
  hideSnack
} from "../../services/snackbar-service/snackbarAction";
import {styles} from "./SnackbarListStyles";


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

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styles)
export default class ShackbarList extends React.Component {

  static propTypes = {
    snack: PropTypes.shape({
      message: PropTypes.string,
      visible: PropTypes.bool,
      type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
    }),
    classes: PropTypes.object.isRequired,
    closeSnackbar: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  state = {
    open: true,
  };

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
          <SnackbarContent className={classes[this.props.snack.type]}
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
          />
        </Snackbar>

      </div>);
  }

}
