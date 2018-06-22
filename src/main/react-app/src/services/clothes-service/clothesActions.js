import {
  securedDelete,
  securedGet,
  securedPost,
  securedPut
} from "../oauth2/xhr";
import map from "lodash/map";
import countBy from "lodash/countBy";
import uniqBy from "lodash/uniqBy";
import findIndex from "lodash/findIndex";
import orderBy from "lodash/orderBy";
import i18n from "../../localization/i18n";

import {FULL_PAGE_WAITING_ID} from "../modal-waiting-service/componentStateActions";
import {LOAD_BASKET, LOAD_CLOTHES_TYPES_WITH_COUNT} from "./clothesActionTypes";

export const putClothesToBasket = (values) => (dispatch) => {
  return dispatch(
    securedPut(process.env.API_URL + '/resource/put-clothes-to-basket/',
      {name: values.type.name})).then(res => {
    return changeClothesCount(values, dispatch, (type) => {
      type.cleanItemCount--;
    });
  });
};

export const deleteClothes = (values) => (dispatch) => {
  //tODO: wait and animation here, delete only dirty
  return dispatch(
    securedDelete(process.env.API_URL + '/resource/delete-clothes/',
      {name: values.type.name})).then(res => {
    if (res.status === 200) {
      return changeClothesCount(values, dispatch, (type) => {
        type.cleanItemCount--;
        type.allItemCount--;
      });
    }
  });
};

export const addClothes = (values) => (dispatch) => {
  //tODO: wait and animation here
  return dispatch(
    securedPost(process.env.API_URL + '/resource/add-clothes/',
      {name: values.type.name})).then(res => {
    return changeClothesCount(values, dispatch, (type) => {
      type.cleanItemCount++;
      type.allItemCount++;
    });
  });
};

export const loadClothesTypesWithCount = () => (dispatch) => {
  return dispatch(
    securedGet(process.env.API_URL + '/resource/all-types-with-count/',
      FULL_PAGE_WAITING_ID))
    .then(response => {
      return dispatch(
        {type: LOAD_CLOTHES_TYPES_WITH_COUNT, clothesTypes: response.data});
    });
};
//TODO: delete
export const mapClothesWithLocalization = (clothes) => {
  const countByType = countBy(clothes, "type.name");
  return orderBy(map(uniqBy(clothes, "type.name"), (item) => {
    const typeVal = item.type.name;
    return {
      id: item.type.id,
      type: typeVal,
      text: i18n.t(typeVal) + " (" + countByType[typeVal] + ")",
      imgSrc: item.type.imgSrc
    };
  }), item => item.type);
};

export const loadBasket = () => (dispatch) => {
  dispatch(securedGet(process.env.API_URL + '/resource/my-basket/')).then(
    response => {
      dispatch({type: LOAD_BASKET, basket: response.data || {}});
    });
};

export const washClothes = (type) => (dispatch) => {
  dispatch(
    securedPost(process.env.API_URL + '/resource/wash-clothes-in-basket/',
      {name: type})).then(
    response => {
      dispatch(loadBasket());
    });
};

const changeClothesCount = function (values, dispatch, changeCount) {
  let indexToReduce = findIndex(values.clothesTypes, (item) => {
    return item.name === values.type.name;
  });
  let newValues = JSON.parse(JSON.stringify(values));
  changeCount(newValues.clothesTypes[indexToReduce]);
  return dispatch({
    type: LOAD_CLOTHES_TYPES_WITH_COUNT,
    clothesTypes: newValues.clothesTypes
  });
};
