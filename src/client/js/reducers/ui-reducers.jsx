import ACTIONS from './../actions/actions';
import {NOTIFICATION} from './../config/constants';

const ui = function(ui, action) {
  switch (action.type) {
    case ACTIONS.REQUEST_ITEMS:
      ui = ui
        .set('isFetching', true)
        .set('error', null)
        .setIn(['notification', 'type'], NOTIFICATION.TYPES.PENDING)
        .setIn(['notification', 'text'], 'Requesting items...');
      return ui;

    // update ui that the request has finished
    case ACTIONS.RECEIVE_ITEMS:
      ui = ui
        .set('isFetching', false)
        .setIn(['notification', 'type'], NOTIFICATION.TYPES.SUCCESS)
        .setIn(['notification', 'text'], 'IcyRecipes Items');
      return ui;

    case ACTIONS.REQUEST_ERROR:
      ui = ui
        .set('isFetching', false)
        .set('error', action.error)
        .setIn(['notification', 'type'], NOTIFICATION.TYPES.ERROR)
        .setIn(['notification', 'text'], action.error.message);
      return ui;

    case ACTIONS.SERVER_ERROR:
      ui = ui
        .set('isFetching', false)
        .set('error', action.error)
        .setIn(['notification', 'type'], NOTIFICATION.TYPES.ERROR)
        .setIn(
          ['notification', 'text'],
          'Request has failed. Please retry later.'
        );
      return ui;

    default:
      return ui;
  }
};

export default ui;
