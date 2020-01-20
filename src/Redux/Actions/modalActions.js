import types from "../ActionTypes";

const showModalAction = value => ({
  type: types.SHOW_MODAL,
  value
});

const hideModalAction = () => ({
  type: types.HIDE_MODAL
});

const cleanModalAction = () => ({
  type: types.CLEAN_MODAL,
});

export const doShowModal = modalProps => dispatch => {
  dispatch(showModalAction(modalProps));
};

export const doCloseModal = () => dispatch => {
  dispatch(hideModalAction());
};

export const cleanModalForm = () => dispatch => {
  dispatch(cleanModalAction());
};
