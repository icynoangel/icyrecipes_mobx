import React from 'react';
import ReactDOM from 'react-dom';
import Item from './../../../../src/client/js/components/items/item';
import {shallow} from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

describe('<Item />', function() {
  this.item = {
    itemImage: '/boat.jpg',
    itemTitle: 'Boat',
    itemDescription: 'Lonely boat'
  };

  this.getComponent = () => {
    return <Item item={this.item} />;
  };

  it('Should render <Item />', () => {
    const wrapper = shallow(this.getComponent());
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });
});
