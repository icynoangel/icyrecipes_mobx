import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from './item';

class Items extends Component {
  static propTypes = {
    items: PropTypes.object.isRequired
  };

  render() {
    const items = this.props.items;

    return (
      <div className="items">
        {items.map((item, key) => {
          return <Item item={item} key={key} />;
        })}
      </div>
    );
  }
}

export default Items;
