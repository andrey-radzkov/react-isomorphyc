import React from "react";
import PropTypes from "prop-types";
import FriendsList from "../components/vk/FriendsList";
import Button from "@material-ui/core/Button/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

export const FriendsDialog = ({title, handleOk, handleCancel, ...other}) => (
  <Dialog
    maxWidth="xs"
    fullWidth={true}
    aria-labelledby="confirmation-dialog-title"
    {...other}
  >
    <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <FriendsList/>

    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={handleCancel}>
        Отмена
      </Button>
      <Button color="primary" onClick={handleOk}>
        Выбрать
      </Button>
    </DialogActions>
  </Dialog>
);


FriendsDialog.propTypes = {
  title: PropTypes.string,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
};

