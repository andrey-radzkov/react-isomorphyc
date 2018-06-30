import React from "react";
import PropTypes from "prop-types";
import i18n from "../../localization/i18n";
import Avatar from "@material-ui/core/Avatar";
import Fade from "@material-ui/core/Fade";
import {styles} from "./TasksListStyles";
import {SendActionButton} from "./SendActionButton";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider/Divider";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";

const QuickTasksList = ({actionTypes, disabled, classes, onClick}) => {
  return (<List component="nav">
    {actionTypes && actionTypes.map(type => {
        return (
          <Fade key={type.id} in={true}>
            <div className={classes.buttonList}>
              <ListItem className={classes.listItem}>
                <Avatar className={classes.bigAvatar}>
                  <img src={process.env.API_URL + "/resource" + type.imgSrc}
                       width="50px" height="50px" alt={i18n.t(type.name)}/>
                </Avatar>
                <div>
                  <SendActionButton className={classes.putClothesBtn}
                                    disabled={false}
                                    onClick={() => onClick(type)}
                  >
                    Закончились {i18n.t(type.name)}
                  </SendActionButton>
                </div>
              </ListItem>
              <Divider/>
            </div>
          </Fade>
        );
      }
    )}

  </List>);


};

QuickTasksList.propTypes = {
  actionTypes: PropTypes.array,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(QuickTasksList);
