import {securedDelete, securedGet, securedPost, securedPut} from "../oauth2/xhr";
import {LOAD_All_CLOTHES, LOAD_BASKET, LOAD_CLEAN_CLOTHES} from "../constants/actionTypes";
import map from "lodash/map";
import countBy from "lodash/countBy";
import uniqBy from "lodash/uniqBy";
import findIndex from "lodash/findIndex";
import pullAt from "lodash/pullAt";
import orderBy from "lodash/orderBy";

import {typeLocalization} from "../constants/clothesTypesLocalization";

export const putClothes = (values, clothes) => (dispatch) => {
  //tODO: wait and animation here
  return dispatch(
    securedPut(process.env.API_URL + '/resource/put-clothes-to-basket/', {name: values.type.name})).then(res => {
    let indexToRemove = findIndex(clothes, (item) => {
      return item.type.name === values.type.name;
    });
    //TODO: create -one , don`t remove, create zero and disable
    //TODO: catch error
    const restClothes = pullAt(clothes, indexToRemove);
    return dispatch({type: LOAD_CLEAN_CLOTHES, cleanClothes: restClothes});
  });
};

export const deleteClothes = (type, clothes) => (dispatch) => {
  //tODO: wait and animation here, delete only dirty
  return dispatch(
    securedDelete(process.env.API_URL + '/resource/delete-clothes/', {name: type})).then(res => {
    if (res.status === 200) {
      let indexToRemove = findIndex(clothes, (item) => {
        return item.type.name === type;
      });
      //TODO: create -one , don`t remove, create zero and disable
      let restClothes = clothes.slice();
      pullAt(restClothes, indexToRemove);
      return dispatch({type: LOAD_All_CLOTHES, clothes: restClothes});
    }
  });
};

export const addClothes = (type, clothes) => (dispatch) => {
  //tODO: wait and animation here
  return dispatch(
    securedPost(process.env.API_URL + '/resource/add-clothes/', {name: type})).then(res => {
    const restClothes = clothes.slice();
    restClothes.push(res.data);
    return dispatch({type: LOAD_All_CLOTHES, clothes: restClothes});
  });
};

export const registerIfNecessary = () => (dispatch) => {
  dispatch(securedGet(process.env.API_URL + '/resource/register-if-necessary/'));
};

export const loadCleanClothes = () => (dispatch) => {
  return dispatch(securedGet(process.env.API_URL + '/resource/clean-clothes/'))
    .then(response => {
      return dispatch({type: LOAD_CLEAN_CLOTHES, cleanClothes: response.data});
    });
};

export const loadClothes = () => (dispatch) => {
  return dispatch(securedGet(process.env.API_URL + '/resource/all-clothes/'))
    .then(response => {
      return dispatch({type: LOAD_All_CLOTHES, clothes: response.data});
    });
};

export const mapClothesWithLocalization = (clothes) => {
  //TODO: move logic to ocmplonent
  const countByType = countBy(clothes, "type.name");
  return orderBy(map(uniqBy(clothes, "type.name"), (item) => {
    const typeVal = item.type.name;
    return {
      id: item.type.id,
      type: typeVal,
      text: typeLocalization[typeVal] + " (" + countByType[typeVal] + ")",
      imgSrc: item.type.imgSrc
    };
  }), item => item.type);
};

export const loadBasket = () => (dispatch) => {
  dispatch(securedGet(process.env.API_URL + '/resource/my-basket/')).then(response => {
    dispatch({type: LOAD_BASKET, basket: response.data || {}});
  });
};

export const washClothes = (type) => (dispatch) => {
  dispatch(
    securedPost(process.env.API_URL + '/resource/wash-clothes-in-basket/', {name: type})).then(
    response => {
      dispatch(loadBasket());
    });
};
