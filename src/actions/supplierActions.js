import {
  CLOSE_MODAL,
  HIDE_WAITING,
  LOAD_SUPPLIER,
  LOAD_SUPPLIERS,
  OPEN_MODAL,
  SHOW_WAITING
} from "../constants/actionTypes";
import {securedGet} from "../oauth2/xhr";

export const loadSupplier = (id) => (dispatch) => {
  dispatch(
    securedGet(process.env.API_URL + '/resource/get-supplier/' + id)).then(
    response => {
      dispatch({type: LOAD_SUPPLIER, data: response.data});
    });
};

export const loadSuppliers = () => (dispatch) => {
  dispatch(securedGet(process.env.API_URL + '/resource/get-suppliers/',
    "supplierLayer")).then(res => {
    dispatch({type: LOAD_SUPPLIERS, suppliers: res.data});
  });
};

export const clearSupplier = () => {
  return {type: LOAD_SUPPLIER, data: {}};
};

export const openModal = (modalId) => {
  return {type: OPEN_MODAL, modalId};
};


export const closeModal = (modalId) => {
  return {type: CLOSE_MODAL, modalId};
};

export const showWaiting = (waitingId) => {
  return {type: SHOW_WAITING, waitingId: waitingId};
};
export const hideWaiting = (waitingId) => {
  return {type: HIDE_WAITING, waitingId: waitingId};
};

export const closeSupplierModal = (id, history) => (dispatch) => {
  dispatch(closeModal("supplierModal"));
  dispatch(clearSupplier());
  setTimeout(function () {
    if (id) {
      history.push('/redux-form');
    }
  }, 300);
};
