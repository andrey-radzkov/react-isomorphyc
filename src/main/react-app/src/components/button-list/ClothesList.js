import {WaitingLayer} from "../WaitingLayer";
import React from "react";
import PropTypes from "prop-types";
import {isClient} from "../../utils/ssr-util";
import {CLOTHES_TYPES_WAITING_ID} from "../../actions/componentStateActions";
import {typeLocalization} from "../../constants/clothesTypesLocalization";
import {Avatar, Button, Card, CardActions, CardHeader, withStyles} from "material-ui";
if (isClient()) {
  require('./button-list.scss');
}
const styles = {
  bigAvatar: {
    width: 60,
    height: 60,
  },
  card: {
    textAlign: "left",
  },
  buttonList: {
    margin: "8px 0px",
  },
  cardHeader: {
    paddingBottom: "8px",
  },
  title: {
    fontSize: "17px"
  }
};
// TODO: red color if lower than
const ClothesList = ({clothesTypesWithCount, showWaiting, onSubmit, handleSubmit, disabled, classes}) => {
  return (<div>
    {clothesTypesWithCount && clothesTypesWithCount.map(type => {
        return (
          <div key={type.id} className={classes.buttonList}>

            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                avatar={
                  <Avatar className={classes.bigAvatar}>
                    <img src={process.env.API_URL + "/resource" + type.imgSrc} width="60px" height="60px"/>
                  </Avatar>
                }
                title={
                  <div className={classes.title}><b>{typeLocalization[type.name]}</b>: всего {type.allItemCount} шт
                  </div>}
                subheader={<div>из них чистых: {type.cleanItemCount} шт</div>}

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
                  <span className="button-list__button-label">Положить в стирку</span>
                </Button>
              </CardActions>
            </Card>

          </div>
        )
      }
    )}
    <WaitingLayer showWaiting={showWaiting} waitingId={CLOTHES_TYPES_WAITING_ID}/>
  </div>);


};

ClothesList.propTypes = {
  clothesTypesWithCount: PropTypes.array,
  disabled: PropTypes.bool,
  showWaiting: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClothesList);
