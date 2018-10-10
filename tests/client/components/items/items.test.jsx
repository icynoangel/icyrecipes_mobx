import React from 'react';
import ReactDOM from 'react-dom';
import Items from './../../../../src/client/js/components/items/items';
import {shallow} from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

describe('<Items />', function() {
  this.items = [
    {
      itemImage: '/boat.jpg',
      itemTitle: 'Boat',
      itemDescription: 'Lonely boat'
    },
    {
      itemImage: '/rain.jpg',
      itemTitle: 'Rain',
      itemDescription: 'Sunset rain'
    }
  ];

  this.getComponent = items => {
    return <Items.wrappedComponent ItemsStore={{items}} />;
  };

  it('Should render <Items />', () => {
    const wrapper = shallow(this.getComponent(this.items));
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render no Item', () => {
    const itemsList = [];
    const wrapper = shallow(this.getComponent(itemsList));

    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });
});
