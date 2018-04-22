import {securedGet, securedPost} from "../oauth2/xhr";
import {LOAD_BASKET, LOAD_CLOTHES} from "../constants/actionTypes";

export const putClothes = () => (dispatch) => {
  //tODO: wait and animation here
  return dispatch(
    //tODO: create put methods in rest api
    securedPost(process.env.API_URL + '/resource/put-clothes-to-basket/'));
};

export const registerIfNecessary = () => (dispatch) => {
  dispatch(securedGet(process.env.API_URL + '/resource/register-if-necessary/'));
};

export const loadClothes = () => (dispatch) => {
  dispatch(securedGet(process.env.API_URL + '/resource/my-clothes/')).then(response => {
    dispatch({type: LOAD_CLOTHES, clothes: response.data});
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
