import './../css/index.scss';
import React, {Component} from 'react';
import Buttons from './components/button/buttons';
import Notification from './components/notification/notification';
import Items from './components/items/items';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Buttons />
        <Notification />
        <Items />
      </div>
    );
  }
}

export default App;
