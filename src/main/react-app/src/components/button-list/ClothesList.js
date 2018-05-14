import {WaitingLayer} from "../WaitingLayer";
import React from "react";
import PropTypes from "prop-types";
import {isClient} from "../../utils/ssr-util";
import {CLOTHES_TYPES_WAITING_ID} from "../../actions/componentStateActions";
import {typeLocalization} from "../../constants/clothesTypesLocalization";
import {Button} from "material-ui";
if (isClient()) {
  require('./button-list.scss');
}

export const ClothesList = ({clothesTypesWithCount, showWaiting, onSubmit, handleSubmit, disabled}) => {
  return (<div>
    {clothesTypesWithCount && clothesTypesWithCount.map(type => {
        return (
          <div key={type.id} className="button-list">
            <Button type="submit"
                    variant="raised"
                    size="large"
                    color="default"
                    className="button-list__clothes-btn"
                    disabled={disabled || type.cleanItemCount === 0}
                    onClick={handleSubmit(values =>
                      onSubmit({
                        "type": {"name": type.name},
                        "clothesTypes": clothesTypesWithCount
                      })
                    )}
            >
              <img src={process.env.API_URL + "/resource" + type.imgSrc} width="50px" height="50px"/>
              <span className="button-list__button-label">{typeLocalization[type.name]} ({type.cleanItemCount})</span>
            </Button>
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

};
