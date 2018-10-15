import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from './item';
import {inject, observer} from 'mobx-react';

@inject('ItemsStore')
@observer
class Items extends Component {
  static propTypes = {
    ItemsStore: PropTypes.object.isRequired
  };

  render() {
    const {ItemsStore} = this.props;

    return (
      <div className="items">
        {ItemsStore.items.map((item, key) => {
          return <Item item={item} key={`item-${item.title}`} />;
        })}
      </div>
    );
  }
}

export default Items;
