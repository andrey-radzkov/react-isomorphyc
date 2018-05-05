import RaisedButton from "material-ui/RaisedButton";
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
        <div key={item.id} style={{margin: "15px"}}>
          <RaisedButton type="submit" className="clothes-btn"
                        disabled={disabled}
                        label={item.text}
                        onClick={handleSubmit(values =>
                          onSubmit({
                            "type": {"name": item.type}
                          }))}
                        icon={<img src={process.env.API_URL + "/resource" + item.imgSrc} width="50px" height="auto"/>}
                        overlayStyle={{padding:"5px"}}
                        style={{
                           height: "auto"
                        }}/>
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
