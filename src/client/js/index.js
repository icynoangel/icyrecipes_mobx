import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './app';

import {configure} from 'mobx';
import {Provider} from 'mobx-react';
import ItemsStore from './stores/items-store';

configure({enforceActions: 'always'});

ReactDOM.render(
  <Provider ItemsStore={ItemsStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
