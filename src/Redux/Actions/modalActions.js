import {
  SHOW_MODAL,
  HIDE_MODAL,
  CLEAN_MODAL,
} from '../ActionTypes';

const showModalAction = (value) => ({
  type: SHOW_MODAL, value
});

const hideModalAction = () => ({
  type: HIDE_MODAL
});

const cleanModalAction = () => ({
  type: CLEAN_MODAL,
});

export const doShowModal = (modalProps) => dispatch => {
  dispatch(showModalAction(modalProps));
};

export const doCloseModal = () => dispatch => {
  dispatch(hideModalAction());
};

export const cleanModalForm = () => dispatch => {
  dispatch(cleanModalAction());
};
