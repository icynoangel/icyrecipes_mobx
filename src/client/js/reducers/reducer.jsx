import appInitialState from './../app-state/app-initial-state';

import items from './items-reducers';
import ui from './ui-reducers';

export default function reducer(state = appInitialState, action) {
  return {
    items: items(state.items, action),
    ui: ui(state.ui, action)
  };
}
