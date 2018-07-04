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
import {List as VirtualList} from 'react-virtualized';

const styles = theme => ({
  viewport: {
    minHeight: 200,
    height: '100%',
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

// TODO: use search
  render() {
    const {classes} = this.props;
    const friends = filter(this.props.friends, friend => friend.first_name !== 'DELETED');
    const receiver = this.props.receiver;
    const onSelect = this.props.onSelect;

    function rowRenderer({
                           key,         // Unique key within array of rows
                           index,       // Index of row within collection
                           isScrolling, // The List is currently being scrolled
                           isVisible,   // This row is visible within the List (eg it is not an overscanned row)
                           style        // Style object to be applied to row (to position it)
                         }) {
      const friend = friends[index];
      const friendFullName = friend.first_name + " " + friend.last_name;
      //TODO: support other social networks
      const vkId = "vk_" + friend.uid;

      return (
        <div style={style} key={friend.uid}>
          <ListItem id={"friend-" + vkId} dense button
                    onClick={() => {
                      onSelect(vkId);
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
                  onSelect(vkId);
                }}
                checked={receiver === vkId}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      );
    }

    return (<div>


      {this.props.friends.length === 0 &&
      <div className="text-center">
        <WaitingLayer showWaiting={true}
                      waitingId="friend-list-waiting"/>
      </div>
      }
      {friends &&
      <List className={classes.viewport}>
        <VirtualList
          // autoHeight={true}
          width={280}
          height={300}
          rowCount={friends.length}
          rowHeight={60}
          rowRenderer={rowRenderer}
        />

      </List>


      }
    </div>);
  }


}
