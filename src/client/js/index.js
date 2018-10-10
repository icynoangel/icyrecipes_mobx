import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import App from './app';

import logger from './middlewares/logger-middleware';

const storeConfig = configureStore([logger]);

ReactDOM.render(
  <storeConfig.Provider store={storeConfig.store}>
    <App />
  </storeConfig.Provider>,
  document.getElementById('root')
);

registerServiceWorker();
