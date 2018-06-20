import React from "react";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import {connect} from "react-redux";
import {loadFriends, selectReceiver, selectSenders} from "../../actions/settingsActions";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import List from "@material-ui/core/List/List";
import withStyles from "@material-ui/core/styles/withStyles";
import filter from "lodash/filter";
import Radio from "@material-ui/core/Radio/Radio";
import {WaitingLayer} from "../app-common/WaitingLayer";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
const styles = theme => ({
  viewport: {
    minHeight: 300,
    height: '100%',
    overflow: "auto",
  },
});

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.friends.length === 0) {
      this.props.loadFriends();
    }
  }

// TODO: use grid, search
  render() {
    const {classes} = this.props;
    return (<div >

      <List className={classes.viewport}>
        {this.props.friends && filter(this.props.friends, friend => friend.first_name !== 'DELETED').map(friend => {
          const friendFullName = friend.first_name + " " + friend.last_name;
          const vkId = "vk_" + friend.uid;
          return (
            <ListItem key={friend.uid} dense button
                      onClick={() => {
                        this.props.multipleSelect ?
                          this.props.selectSenders(vkId, this.props.senders) : this.props.selectReceiver(vkId)
                      }
                      }>
              <ListItemAvatar>
                <Avatar alt={friendFullName} src={friend.photo_50}/>
              </ListItemAvatar>
              <ListItemText primary={friendFullName}/>
              <ListItemSecondaryAction>
                {this.props.multipleSelect ?
                  <Checkbox
                    value={vkId}
                    onChange={() => this.props.selectSenders(vkId, this.props.senders)}
                    checked={this.props.senders.indexOf(vkId) >= 0}
                  /> :
                  <Radio
                    name="friend"
                    value={vkId}
                    onChange={() => this.props.selectReceiver(vkId)}
                    checked={this.props.receiver === vkId}
                  />
                }
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        {this.props.friends.length === 0 &&
        <div className="text-center">
          <WaitingLayer showWaiting={true}
                        waitingId="friend-list-waiting"/>
        </div>
        }
      </List>
    </div>);
  }

}

FriendsList.propTypes = {
  loadFriends: PropTypes.func,
  selectReceiver: PropTypes.func,
  selectSenders: PropTypes.func,
  friends: PropTypes.array,
  senders: PropTypes.array,
  receiver: PropTypes.string,
  multipleSelect: PropTypes.bool,
  classes: PropTypes.object.isRequired,

};

const mapDispatchToProps = dispatch => {
  return {
    loadFriends: () => dispatch(loadFriends()),
    selectReceiver: (id) => dispatch(selectReceiver(id)),
    selectSenders: (selectionId, alreadySelected) => dispatch(selectSenders(selectionId, alreadySelected)),
  };
};

const mapStateToProps = (state) => {
  return {
    friends: state.settingsReducer.friends,
    receiver: state.settingsReducer.receiver,
    senders: state.settingsReducer.senders,
  };
};

FriendsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsList);

export default withStyles(styles, {withTheme: true})(FriendsList);

