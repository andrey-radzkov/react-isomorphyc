import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadFriends} from "../../services/settings-service/settingsActions";
import List from "@material-ui/core/List/List";
import withStyles from "@material-ui/core/styles/withStyles";
import filter from "lodash/filter";
import {WaitingLayer} from "../app-common/WaitingLayer";
import {AutoSizer} from 'react-virtualized';
import {VirtualList} from "../app-common/VirtualList";
import {friendsListRowRenderer} from "./FriendListRowRenderer";

const styles = theme => ({
  viewport: {
    height: "calc(100vh - 210px)",
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

    return (
      <div>
        {this.props.friends.length === 0 &&
        <div className="text-center">
          <WaitingLayer showWaiting={true}
                        waitingId="friend-list-waiting"/>
        </div>
        }
        {friends &&
        <List className={classes.viewport}>
          <AutoSizer
            onResize={({height, width}) =>
              VirtualList(height, width, friends, friendsListRowRenderer(friends, this.props.onSelect, this.props.receiver))}>
            {({height, width}) =>
              VirtualList(height, width, friends, friendsListRowRenderer(friends, this.props.onSelect, this.props.receiver))
            }
          </AutoSizer>
        </List>
        }
      </div>);
  }


}
