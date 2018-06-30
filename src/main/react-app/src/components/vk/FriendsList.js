import React from "react";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import {connect} from "react-redux";
import {loadFriends} from "../../services/settings-service/settingsActions";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import List from "@material-ui/core/List/List";
import withStyles from "@material-ui/core/styles/withStyles";
import filter from "lodash/filter";
import Radio from "@material-ui/core/Radio/Radio";
import {WaitingLayer} from "../app-common/WaitingLayer";

const styles = theme => ({
  viewport: {
    minHeight: 300,
    height: '100%',
    overflow: "auto",
  },
});
const mapDispatchToProps = dispatch => {
  return {
    loadFriends: () => dispatch(loadFriends()),
  };
};

const mapStateToProps = (state) => {
  return {
    friends: state.settingsReducer.friends,
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withStyles(styles, {withTheme: true})
export default class FriendsList extends React.Component {
  static propTypes = {
    loadFriends: PropTypes.func,
    onSelect: PropTypes.func,
    friends: PropTypes.array,
    receiver: PropTypes.string,
    classes: PropTypes.object.isRequired,

  };

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
    return (<div>

      <List className={classes.viewport}>
        {this.props.friends && filter(this.props.friends,
          friend => friend.first_name !== 'DELETED').map(friend => {
          const friendFullName = friend.first_name + " " + friend.last_name;
          //TODO: support other social networks
          const vkId = "vk_" + friend.uid;
          return (
            <ListItem key={friend.uid} dense button
                      onClick={() => {
                        this.props.onSelect(vkId);
                      }}>
              <ListItemAvatar>
                <Avatar alt={friendFullName} src={friend.photo_50}/>
              </ListItemAvatar>
              <ListItemText primary={friendFullName}/>
              <ListItemSecondaryAction>
                <Radio
                  name="friend"
                  value={vkId}
                  onChange={() => {
                    this.props.onSelect(vkId);
                  }}
                  checked={this.props.receiver === vkId}
                />
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
