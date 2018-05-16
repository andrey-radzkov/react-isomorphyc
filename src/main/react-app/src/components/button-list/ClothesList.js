import {WaitingLayer} from "../WaitingLayer";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {CLOTHES_TYPES_WAITING_ID} from "../../actions/componentStateActions";
import {typeLocalization} from "../../constants/clothesTypesLocalization";
import {Avatar, Button, Card, CardActions, CardHeader, withStyles} from "material-ui";
import Edit from "@material-ui/icons/Edit";
import Done from "@material-ui/icons/Done";
import {styles} from "./ClothesListStyles";

const isTooLowCleanClothes = function (type) {
  return type.cleanItemCount < 3 && type.allItemCount > 0;
};

const ClothesList = ({clothesTypesWithCount, showWaiting, onSubmit, handleSubmit, disabled, classes, editMode}) => {
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
                <Button type="submit"
                        color="primary"
                        variant="raised"
                        className="button-list__clothes-btn"
                        disabled={disabled || type.cleanItemCount === 0}
                        onClick={handleSubmit(values =>
                          onSubmit({
                            "type": {"name": type.name},
                            "clothesTypes": clothesTypesWithCount
                          })
                        )}
                >
                  <span
                    className="button-list__button-label">Положить в стирку</span>
                </Button>
              </CardActions>
            </Card>

          </div>
        );
      }
    )}
    {clothesTypesWithCount &&
    <Button variant="fab" color="secondary" className={classes.buttonPosition}>
      {!editMode &&
      <Edit/>
      }
      {editMode &&
      <Done/>
      }
    </Button>
    }
    <WaitingLayer showWaiting={showWaiting}
                  waitingId={CLOTHES_TYPES_WAITING_ID}/>
  </div>);


};

ClothesList.propTypes = {
  clothesTypesWithCount: PropTypes.array,
  disabled: PropTypes.bool,
  editMode: PropTypes.bool,
  showWaiting: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(ClothesList);
