import React from 'react';
import {shallow, mount} from 'enzyme';
import Button from './../../../../src/client/js/components/button/button';
import ModalConfirmation from './../../../../src/client/js/components/modal/modal-confirmation';
import enzymeToJson from 'enzyme-to-json';

describe('<ModalConfirmation />', function() {
  this.getComponent = () => {
    return (
      <ModalConfirmation
        onConfirm={this.onConfirm}
        onDeny={this.onDeny}
        description={this.description}
        close={this.close}
      />
    );
  };

  beforeEach(() => {
    this.onConfirm = jest.fn();
    this.onDeny = jest.fn();
    this.description = 'Please confirm or deny';
    this.close = jest.fn();
  });

  it('Should render ModalConfirmation', () => {
    const wrapper = shallow(this.getComponent());
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

  it('Should call onConfirm when pressing confirm button', () => {
    const wrapper = shallow(this.getComponent());
    wrapper
      .find(Button)
      .first()
      .simulate('click');
    expect(this.onConfirm).toHaveBeenCalledTimes(1);
    expect(this.close).toHaveBeenCalledTimes(1);
  });

  it('Should call onDeny when pressing deny button', () => {
    const wrapper = shallow(this.getComponent());
    wrapper
      .find(Button)
      .last()
      .simulate('click');
    expect(this.onDeny).toHaveBeenCalledTimes(1);
    expect(this.close).toHaveBeenCalledTimes(1);
  });

  it('Should use defaultProp close', () => {
    const warnSpy = jest.spyOn(global.console, 'warn');

    const wrapper = mount(
      <ModalConfirmation
        onConfirm={this.onConfirm}
        onDeny={this.onDeny}
        description={this.description}
      />
    );

    const modalConfirmation = wrapper.find(ModalConfirmation);
    expect(modalConfirmation.length).toEqual(1);

    modalConfirmation.prop('close')();

    expect(warnSpy).toHaveBeenCalledWith(
      'Close was not passed to ModalElement'
    );
  });
});
