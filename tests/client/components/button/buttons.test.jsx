import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from './../../../../src/client/js/components/button/buttons';
import Button from './../../../../src/client/js/components/button/button';
import Modal from './../../../../src/client/js/components/modal/modal';
import {mount} from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

describe('<Buttons />', function() {
  this.props = {
    ItemsStore: {
      getItems: jest.fn()
    }
  };
  this.getComponent = props => {
    return <Buttons {...this.props} />;
  };

  it('Should render <Buttons />, <Modal /> and <ModalConfirmation />', () => {
    const wrapper = mount(this.getComponent());
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

  it('Should call open method from <Modal />', () => {
    const openSpy = jest.spyOn(Modal.prototype, 'open');
    const wrapper = mount(this.getComponent());
    wrapper
      .find(Button)
      .last()
      .simulate('click');
    expect(openSpy).toHaveBeenCalledTimes(1);
  });

  it('Should call onConfirm from <Buttons /> when confirm is pressed', () => {
    const confirmSpy = jest.spyOn(
      Buttons.wrappedComponent.prototype,
      'onConfirm'
    );
    const wrapper = mount(this.getComponent());
    wrapper
      .find(Button)
      .last()
      .simulate('click');
    wrapper.find('[caption="Confirm"]').simulate('click');
    expect(confirmSpy).toHaveBeenCalledTimes(1);
  });

  it('Should call onDeny from <Buttons /> when deny is pressed', () => {
    const denySpy = jest.spyOn(Buttons.wrappedComponent.prototype, 'onDeny');
    const wrapper = mount(this.getComponent());
    wrapper
      .find(Button)
      .last()
      .simulate('click');
    wrapper.find('[caption="Deny"]').simulate('click');
    expect(denySpy).toHaveBeenCalledTimes(1);
  });
});
