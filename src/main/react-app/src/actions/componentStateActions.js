import {
  CLOSE_MODAL,
  HIDE_WAITING,
  OPEN_MODAL,
  SHOW_WAITING
} from "../constants/actionTypes";

export const FULL_PAGE_WAITING_ID = "full-page-waiting";

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

