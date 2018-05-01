import Button from "react-bootstrap/lib/Button";
import {WaitingLayer} from "./WaitingLayer";
import React from "react";
import PropTypes from "prop-types";
export const ButtonList = ({mappedClothes, onSubmit, handleSubmit, disabled, busy}) => {
  if (mappedClothes && mappedClothes.length > 0) {
    return mappedClothes.map(item => {
      return (
        <div key={item.id} style={{margin: "15px"}}>
          <Button bsStyle="default" bsSize="large" type="submit" className="clothes-btn"
                  disabled={disabled}
                  onClick={handleSubmit(values =>
                    onSubmit({
                      "type": {"name": item.type}
                    }))}
                  style={{background: "url(" + process.env.API_URL + "/resource" + item.imgSrc + ") no-repeat 5px 0px"}}>
            {item.text}
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
