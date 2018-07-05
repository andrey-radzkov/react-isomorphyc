import React from "react";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Radio from "@material-ui/core/Radio/Radio";


export const friendsListRowRenderer = (friends, onSelect, receiver) =>
  ({
     key,         // Unique key within array of rows
     index,       // Index of row within collection
     isScrolling, // The List is currently being scrolled
     isVisible,   // This row is visible within the List (eg it is not an overscanned row)
     style        // Style object to be applied to row (to position it)
   }) => {
    const friend = friends[index];
    const friendFullName = friend.first_name + " " + friend.last_name;
    //TODO: support other social networks
    const vkId = "vk_" + friend.uid;

    return (
      <div style={style} key={friend.uid}>
        {/*{isScrolling*/}
          {/*? '...'*/}
          {/*:*/}
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
        {/*}*/}
      </div>
    );
  };
