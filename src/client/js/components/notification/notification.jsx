import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

@inject('ItemsStore')
@observer
class Notification extends Component {
  static propTypes = {
    ItemsStore: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="notification">
        <div className="notification__content">
          {this.props.ItemsStore.text}
        </div>
      </div>
    );
  }
}

export default Notification;
