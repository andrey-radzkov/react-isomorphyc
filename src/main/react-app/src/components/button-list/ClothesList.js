import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {typeLocalization} from "../../constants/clothesTypesLocalization";
import {Avatar, Button, Card, CardActions, CardHeader, withStyles} from "material-ui";
import Edit from "@material-ui/icons/Edit";
import Done from "@material-ui/icons/Done";
import {styles} from "./ClothesListStyles";
import Delete from "@material-ui/icons/Delete";
import {ClothesActionButton} from "./ClothesActionButton";
import Archive from "@material-ui/icons/Archive";
import {ExposurePlus1} from "@material-ui/icons/index";

const isTooLowCleanClothes = function (type) {
  return type.cleanItemCount < 3 && type.allItemCount > 0;
};

const ClothesList = ({clothesTypesWithCount, onPutSubmit, onAddSubmit, onDeleteSubmit, handleSubmit, disabled, classes, editMode, onEditClick}) => {
  return (<div>
    {clothesTypesWithCount && clothesTypesWithCount.map(type => {
        return (
          <div key={type.id} className={classes.buttonList}>

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
                {!editMode &&
                <ClothesActionButton className={classes.putClothesBtn} disabled={type.cleanItemCount === 0}
                                     handleSubmit={handleSubmit} onSubmit={onPutSubmit} type={type}
                                     clothesTypesWithCount={clothesTypesWithCount}
                                     color="primary">
                  Положить в стирку <Archive className={classes.icon}/>
                </ClothesActionButton>
                }
                {editMode &&
                <ClothesActionButton className={classes.addClothesBtn} disabled={false}
                                     handleSubmit={handleSubmit} onSubmit={onAddSubmit} type={type}
                                     clothesTypesWithCount={clothesTypesWithCount}
                                     color="secondary">
                  Добавить <ExposurePlus1 className={classes.icon}/>
                </ClothesActionButton>
                }
                {editMode &&
                <ClothesActionButton className={classes.deleteClothesBtn} disabled={type.cleanItemCount === 0}
                                     handleSubmit={handleSubmit} onSubmit={onDeleteSubmit} type={type}
                                     clothesTypesWithCount={clothesTypesWithCount}
                                     color="default"><Delete/></ClothesActionButton>
                }
              </CardActions>
            </Card>

          </div>
        );
      }
    )}
    {clothesTypesWithCount &&
    <Button variant="fab" color="secondary" className={classes.buttonPosition} onClick={onEditClick}>
      {editMode ? <Done/> : <Edit/>}
    </Button>
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
};

export default withStyles(styles, {withTheme: true})(ClothesList);
