import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const item = this.props.item;

    return (
      <div className="item">
        <div className="item__image">
          <img src={item.image} alt={item.description} />
        </div>
        <div className="item__details">
          <div className="item__title">{item.title}</div>
          <div className="item__description">{item.description}</div>
        </div>
      </div>
    );
  }
}

export default Item;
