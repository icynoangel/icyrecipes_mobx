import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './../../../../src/client/js/components/notification/notification';
import {shallow} from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

describe('<Notification />', function() {
  this.getComponent = () => {
    return <Notification.wrappedComponent ItemsStore={{text: 'test text'}} />;
  };

  it('Should render <Notification />', () => {
    const wrapper = shallow(this.getComponent());
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });
});
