import React from 'react';
import ReactDOM from 'react-dom';
import App from './../../src/client/js/app';
import {shallow} from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

describe('<App />', function() {
  it('Should render <App />', () => {
    const wrapper = shallow(<App />);
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });
});
