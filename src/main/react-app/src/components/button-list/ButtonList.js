import Button from "material-ui/Button";
import {WaitingLayer} from "../WaitingLayer";
import React from "react";
import PropTypes from "prop-types";
import {isClient} from "../../utils/ssr-util";
if (isClient()) {
  require('./button-list.scss');
}

export const ButtonList = ({mappedClothes, onSubmit, handleSubmit, disabled, busy}) => {
  if (mappedClothes && mappedClothes.length > 0) {
    return mappedClothes.map(item => {
      return (
        <div key={item.id} className="button-list">
          <Button type="submit"
                  variant="raised"
                  size="large"
                  color="default"
                  className="button-list__clothes-btn"
                  disabled={disabled}
                  onClick={handleSubmit(values =>
                    onSubmit({
                      "type": {"name": item.type}
                    })
                  )}
          >
            <img src={process.env.API_URL + "/resource" + item.imgSrc} width="50px" height="50px"/>
            <span className="button-list__button-label">{item.text}</span>
          </Button>
        </div>
      );
    });
  } else if (busy) {
    return (<WaitingLayer showWaiting={true}/>);
  } else {
    return (null);
  }
};

ButtonList.propTypes = {
  mappedClothes: PropTypes.array,
  disabled: PropTypes.bool,
  busy: PropTypes.bool,
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,

};
