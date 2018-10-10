import ACTIONS from './actions';
import Ajax from './../services/ajax';
import config from './../config/config';

export function requestItems() {
  return {
    type: ACTIONS.REQUEST_ITEMS
  };
}

export function receiveItems(response) {
  return {
    type: ACTIONS.RECEIVE_ITEMS,
    response
  };
}

export function setRequestError(error) {
  return {
    type: ACTIONS.REQUEST_ERROR,
    error: error
  };
}

export function setServerError(error) {
  return {
    type: ACTIONS.SERVER_ERROR,
    error: error
  };
}

export function getItems() {
  return dispatch => {
    // dispatch - app state is updated to inform that API call is starting
    dispatch(requestItems());

    return Ajax.get(config.items())
      .then(response => {
        // dispatch
        if (response.error) {
          dispatch(setRequestError(response.error));
        } else {
          dispatch(receiveItems(response));
        }
      })
      .catch(error => {
        dispatch(setServerError(error));
      });
  };
}
