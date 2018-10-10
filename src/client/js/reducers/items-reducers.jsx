import ACTIONS from './../actions/actions';
import Immutable from 'immutable';

const items = function(items, action) {
  switch (action.type) {
    case ACTIONS.RECEIVE_ITEMS:
      items = Immutable.fromJS(action.response.items);
      return items;

    default:
      return items;
  }
};

export default items;
