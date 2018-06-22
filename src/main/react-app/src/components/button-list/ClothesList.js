import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {typeLocalization} from "../../constants/clothesTypesLocalization";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Fade from "@material-ui/core/Fade";
import Zoom from "@material-ui/core/Zoom";
import Edit from "@material-ui/icons/Edit";
import Done from "@material-ui/icons/Done";
import {styles} from "./ClothesListStyles";
import Delete from "@material-ui/icons/Delete";
import {ClothesActionButton} from "./ClothesActionButton";
import Archive from "@material-ui/icons/Archive";
import ExposurePlus1 from "@material-ui/icons/ExposurePlus1";
import withStyles from "@material-ui/core/styles/withStyles";

const isTooLowCleanClothes = function (type) {
  return type.cleanItemCount < 3 && type.allItemCount > 0;
};

const ClothesList = ({clothesTypesWithCount, onPutSubmit, onAddSubmit, onDeleteSubmit, handleSubmit, disabled, classes, theme, editMode, onEditClick}) => {
  return (<div>
    {clothesTypesWithCount && clothesTypesWithCount.map(type => {
        return (
          <Fade key={type.id} in={true}>
            <div className={classes.buttonList}>

              <Card className={classnames(classes.card, {
                [classes.redCard]: isTooLowCleanClothes(type),
              })}>
                <CardHeader
                  className={classes.cardHeader}
                  avatar={
                    <Avatar className={classes.bigAvatar}>
                      <img src={process.env.API_URL + "/resource" + type.imgSrc}
                           width="60px" height="60px"/>
                    </Avatar>
                  }
                  title={
                    <div className={classes.title}>
                      <b>{typeLocalization[type.name]}</b>:
                      чистых {type.cleanItemCount} шт
                    </div>}
                  subheader={<div>Всего в наличии: {type.allItemCount} шт</div>}

                />
                <CardActions>
                  {/*TODO: disable if no basket*/}
                  {!editMode &&
                  <ClothesActionButton className={classes.putClothesBtn}
                                       disabled={type.cleanItemCount === 0}
                                       handleSubmit={handleSubmit}
                                       onSubmit={onPutSubmit} type={type}
                                       clothesTypesWithCount={clothesTypesWithCount}
                                       color="primary">
                    Положить в стирку <Archive className={classes.icon}/>
                  </ClothesActionButton>
                  }
                  {editMode &&
                  <ClothesActionButton className={classes.addClothesBtn}
                                       disabled={false}
                                       handleSubmit={handleSubmit}
                                       onSubmit={onAddSubmit} type={type}
                                       clothesTypesWithCount={clothesTypesWithCount}
                                       color="secondary">
                    Добавить <ExposurePlus1 className={classes.icon}/>
                  </ClothesActionButton>
                  }
                  {editMode &&
                  <ClothesActionButton className={classes.deleteClothesBtn}
                                       disabled={type.cleanItemCount === 0}
                                       handleSubmit={handleSubmit}
                                       onSubmit={onDeleteSubmit} type={type}
                                       clothesTypesWithCount={clothesTypesWithCount}
                                       color="default"><Delete/></ClothesActionButton>
                  }
                </CardActions>
              </Card>

            </div>
          </Fade>
        );
      }
    )}
    {clothesTypesWithCount && clothesTypesWithCount.length > 0 &&
    <Zoom key="secondary" in={true}>
      <Button variant="fab" color="secondary" className={classes.buttonPosition}
              onClick={onEditClick}>
        {editMode ? <Done/> : <Edit/>}
      </Button>
    </Zoom>
    }
  </div>);


};

ClothesList.propTypes = {
  clothesTypesWithCount: PropTypes.array,
  disabled: PropTypes.bool,
  editMode: PropTypes.bool,
  onPutSubmit: PropTypes.func.isRequired,
  onAddSubmit: PropTypes.func.isRequired,
  onDeleteSubmit: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object
};

export default withStyles(styles, {withTheme: true})(ClothesList);
