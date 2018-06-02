import React from "react";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import {connect} from "react-redux";
import {loadFriends, selectReceiver} from "../../actions/settingsActions";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import List from "@material-ui/core/List/List";
import withStyles from "@material-ui/core/styles/withStyles";
import filter from "lodash/filter";
import Radio from "@material-ui/core/Radio/Radio";
const styles = theme => ({
  viewport: {
    height: 300,
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

// TODO: use grid
  render() {
    const {classes} = this.props;
    return (<div >
      {this.props.render &&
      (<div>Список друзей для поиска
        {/*TODO: re render checkbox if load is slow*/}
        <List className={classes.viewport}>
          {this.props.friends && filter(this.props.friends, friend => friend.first_name !== 'DELETED').map(friend => {
            const friendFullName = friend.first_name + " " + friend.last_name;
            const vkId = "vk_" + friend.uid;
            return (
              <ListItem key={friend.uid} dense button onClick={() => this.props.selectReceiver(vkId)}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={friend.photo_50}/>
                </ListItemAvatar>
                <ListItemText primary={friendFullName}/>
                <ListItemSecondaryAction>
                  <Radio
                    name="friend"
                    value={vkId}
                    onChange={() => this.props.selectReceiver(vkId)}
                    checked={this.props.receiver === vkId}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>)
      }
    </div>);
  }

}

FriendsList.propTypes = {
  loadFriends: PropTypes.func,
  selectReceiver: PropTypes.func,
  friends: PropTypes.array,
  receiver: PropTypes.number,
  render: PropTypes.bool,
  classes: PropTypes.object.isRequired,

};

const mapDispatchToProps = dispatch => {
  return {
    loadFriends: () => dispatch(loadFriends()),
    selectReceiver: (id) => dispatch(selectReceiver(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    friends: state.settingsReducer.friends,
    receiver: state.settingsReducer.receiver,
  };
};

FriendsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsList);

export default withStyles(styles, {withTheme: true})(FriendsList);

