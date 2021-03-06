import React from "react";
import PropTypes from "prop-types";
import FriendsList from "../components/vk/FriendsList";
import Button from "@material-ui/core/Button/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from "@material-ui/core/Slide/Slide";

@withMobileDialog()
export default class FriendsDialog extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    open: PropTypes.bool,
    fullScreen: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
  }

  render() {
    const Transition = (props) => {
      return <Slide direction="left" {...props} />;
    };
    const {fullScreen} = this.props;
    return (
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        TransitionComponent={fullScreen ? Transition : undefined}
        aria-labelledby="confirmation-dialog-title"
        open={this.props.open}
      >
        <DialogTitle id="confirmation-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent style={{overflow: "hidden"}}>
          <FriendsList onSelect={(id) => this.setState({id: id})} receiver={this.state.id}/>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.props.handleCancel}>
            Отмена
          </Button>
          <Button color="primary" disabled={this.state.id === null} onClick={() => {
            this.props.handleOk(this.state.id);
            this.setState({id: null});
          }}>
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
