import * as actions from '../ActionTypes';

const showModalAction = (value) => ({
  type: actions.SHOW_MODAL, value
});

const hideModalAction = () => ({
  type: actions.HIDE_MODAL
});

const cleanModalAction = () => ({
  type: actions.CLEAN_MODAL,
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
