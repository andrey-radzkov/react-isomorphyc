import {securedGet, securedPost, securedPut} from "../oauth2/xhr";
import {LOAD_BASKET, LOAD_CLOTHES} from "../constants/actionTypes";
import map from "lodash/map";
import countBy from "lodash/countBy";
import uniqBy from "lodash/uniqBy";
import findIndex from "lodash/findIndex";
import pullAt from "lodash/pullAt";

import {typeLocalization} from "../constants/clothesTypesLocalization";

export const putClothes = (values, clothes) => (dispatch) => {
  //tODO: wait and animation here
  return dispatch(
    securedPut(process.env.API_URL + '/resource/put-clothes-to-basket/', {type: values.type.type})).then(res => {
    let indexToRemove = findIndex(clothes, (item) => {
      return item.type.type === values.type.type;
    });
    const restClothes = pullAt(clothes, indexToRemove);
    return dispatch({type: LOAD_CLOTHES, clothes: restClothes});
  });
};

export const registerIfNecessary = () => (dispatch) => {
  dispatch(securedGet(process.env.API_URL + '/resource/register-if-necessary/'));
};

export const loadClothes = () => (dispatch) => {
  return dispatch(securedGet(process.env.API_URL + '/resource/clean-clothes/'))
    .then(response => {
      return dispatch({type: LOAD_CLOTHES, clothes: response.data});
    });
};

export const mapRemainingClothesWithLocalization = (clothes) => {
  //TODO: move logic to ocmplonent
  const countByType = countBy(clothes, "type.name");
  return map(uniqBy(clothes, "type.name"), (item) => {
    const typeVal = item.type.name;
    return {type: typeVal, text: typeLocalization[typeVal] + " (" + countByType[typeVal] + ")"};
  });
};

export const loadBasket = () => (dispatch) => {
  dispatch(securedGet(process.env.API_URL + '/resource/my-basket/')).then(response => {
    dispatch({type: LOAD_BASKET, basket: response.data || {}});
  });
};

export const washClothes = (e) => (dispatch) => {
  e.preventDefault();
  dispatch(
    securedPost(process.env.API_URL + '/resource/wash-clothes-in-basket/')).then(
    response => {
      dispatch(loadBasket());
    });
};
