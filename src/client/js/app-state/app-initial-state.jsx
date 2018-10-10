import Immutable from 'immutable';
import {NOTIFICATION} from './../config/constants';

const appInitialState = {
  items: Immutable.fromJS([]),
  ui: Immutable.fromJS({
    isFetching: false,
    didInvalidate: false,
    error: null,
    notification: {
      type: NOTIFICATION.TYPES.PENDING,
      text: 'IcyRecipes'
    }
  })
};

export default appInitialState;
