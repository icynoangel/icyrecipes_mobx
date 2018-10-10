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
          <img src={item.itemImage} alt={item.itemDescription} />
        </div>
        <div className="item__details">
          <div className="item__title">{item.itemTitle}</div>
          <div className="item__description">{item.itemDescription}</div>
        </div>
      </div>
    );
  }
}

export default Item;
