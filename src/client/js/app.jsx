import './../css/index.scss';
import React, {Component} from 'react';
import ButtonsProvider from './components/containers/buttons-provider';
import NotificationProvider from './components/containers/notification-provider';
import ItemsProvider from './components/containers/items-provider';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ButtonsProvider />
        <NotificationProvider />
        <ItemsProvider />
      </div>
    );
  }
}

export default App;
