import {
  CLOSE_MODAL,
  LOAD_SUPPLIER,
  LOAD_SUPPLIERS,
  OPEN_MODAL
} from "../constants/actionTypes";
import {securedGet} from "../oauth2/xhr";

export const loadSupplier = (id) => {
  return function (dispatch) {
    securedGet(process.env.API_URL + '/resource/get-supplier/' + id).then(
      response => {
        dispatch({type: LOAD_SUPPLIER, data: response.data});
      }).catch(error => {
      return error;
    });
  };
};

export const loadSuppliers = () => {
  return function (dispatch) {
    securedGet(process.env.API_URL + '/resource/get-suppliers/', dispatch,
      "supplierLayer").then(res => {
      dispatch({type: LOAD_SUPPLIERS, suppliers: res.data});
    }).catch(error => {
      return error;
    });
  };
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

export const closeSupplierModal = (id, history) => {
  return function (dispatch) {
    dispatch(closeModal("supplierModal"));
    dispatch(clearSupplier());
    setTimeout(function () {
      if (id) {
        history.push('/redux-form');
      }
    }, 300);
  };
};
