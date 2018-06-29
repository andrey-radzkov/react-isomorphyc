import React from "react";
import PropTypes from "prop-types";
import i18n from "../../localization/i18n";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Fade from "@material-ui/core/Fade";
import {styles} from "./ClothesListStyles";
import {ClothesActionButton} from "./ClothesActionButton";
import withStyles from "@material-ui/core/styles/withStyles";

const QuickTasksList = ({actionTypes, handleSubmit, disabled, classes, onPutSubmit}) => {
  return (<div>
    {actionTypes && actionTypes.map(type => {
        return (
          <Fade key={type.id} in={true}>
            <div className={classes.buttonList}>
              <Card>
                <CardHeader
                  className={classes.cardHeader}
                  avatar={
                    <Avatar className={classes.bigAvatar}>
                      <img src={process.env.API_URL + "/resource" + type.imgSrc}
                           width="50px" height="50px" alt={i18n.t(type.name)}/>
                    </Avatar>
                  }
                  title={
                    <ClothesActionButton className={classes.putClothesBtn}
                                         disabled={false}
                                         handleSubmit={handleSubmit}
                                         onSubmit={onPutSubmit} type={type}
                                         clothesTypesWithCount={actionTypes}
                    >
                      Закончились {i18n.t(type.name)}
                    </ClothesActionButton>}
                />
              </Card>
            </div>
          </Fade>
        );
      }
    )}

  </div>);


};

QuickTasksList.propTypes = {
  actionTypes: PropTypes.array,
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  onPutSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(QuickTasksList);
