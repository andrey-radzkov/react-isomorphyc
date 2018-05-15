import {WaitingLayer} from "../WaitingLayer";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {CLOTHES_TYPES_WAITING_ID} from "../../actions/componentStateActions";
import {typeLocalization} from "../../constants/clothesTypesLocalization";
import {Avatar, Button, Card, CardActions, CardHeader, withStyles} from "material-ui";

const styles = theme => ({
  bigAvatar: {
    width: 60,
    height: 60,
  },
  card: {
    textAlign: "left",
  },
  redCard: {
    background: "#fff0f0",
  },
  buttonList: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: 0,
    marginRight: 0,
  },
  cardHeader: {
    paddingBottom: theme.spacing.unit,
  },
  title: {
    fontSize: "17px"
  }
});
const ClothesList = ({clothesTypesWithCount, showWaiting, onSubmit, handleSubmit, disabled, classes}) => {
  return (<div>
    {clothesTypesWithCount && clothesTypesWithCount.map(type => {
        const tooLowCleanClothes = type.cleanItemCount < 3 && type.allItemCount > 0;
        return (
          <div key={type.id} className={classes.buttonList}>

            <Card className={classnames(classes.card, {
              [classes.redCard]: tooLowCleanClothes,
            })}>
              <CardHeader
                className={classes.cardHeader}
                avatar={
                  <Avatar className={classes.bigAvatar}>
                    <img src={process.env.API_URL + "/resource" + type.imgSrc} width="60px" height="60px"/>
                  </Avatar>
                }
                title={
                  <div className={classes.title}><b>{typeLocalization[type.name]}</b>: чистых {type.cleanItemCount} шт
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
                  <span className="button-list__button-label">Положить в стирку</span>
                </Button>
              </CardActions>
            </Card>

          </div>
        )
      }
    )}
    <WaitingLayer showWaiting={showWaiting} waitingId={CLOTHES_TYPES_WAITING_ID}/>
    {/*<Button variant="fab" className={fab.className} color={fab.color}>*/}
    {/*{fab.icon}*/}
    {/*</Button>*/}
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

export default withStyles(styles, {withTheme: true})(ClothesList);
