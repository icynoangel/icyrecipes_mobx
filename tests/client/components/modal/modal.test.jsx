import React, {Component} from 'react';
import {mount, shallow} from 'enzyme';
import Modal, {
  ModalElement
} from './../../../../src/client/js/components/modal/modal';
import enzymeToJson from 'enzyme-to-json';

const TestChild = () => {
  return <div>Test Child</div>;
};

describe('<Modal />', function() {
  this.getComponent = () => {
    return (
      <Modal onClose={this.onClose} size="small">
        <TestChild />
      </Modal>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    this.onClose = jest.fn();
  });

  it('Should render <Modal />', () => {
    const wrapper = mount(this.getComponent());
    expect(wrapper.find(Modal).length).toEqual(1);
  });

  it('Should change to open state', () => {
    const addListenersSpy = jest.spyOn(Modal.prototype, 'addListeners');
    const wrapper = mount(this.getComponent());
    const modal = wrapper.find(Modal);

    modal.instance().open();

    expect(wrapper.state('open')).toBe(true);
    expect(addListenersSpy).toHaveBeenCalledTimes(1);
  });

  it('Should change to close state', () => {
    const removeListenersSpy = jest.spyOn(Modal.prototype, 'removeListeners');
    const wrapper = mount(this.getComponent());
    const modal = wrapper.find(Modal);
    wrapper.setState({open: true});

    modal.instance().close();

    expect(wrapper.state('open')).toBe(false);
    expect(this.onClose).toHaveBeenCalledTimes(1);
    expect(removeListenersSpy).toHaveBeenCalledTimes(1);
  });

  it('Should create ModalElement portal and pass close and size props', done => {
    const wrapper = mount(this.getComponent());
    const modal = wrapper.find(Modal);
    wrapper.setState({open: true}, () => {
      const modalElement = wrapper.find(ModalElement);
      expect(modalElement.length).toEqual(1);
      expect(modalElement.prop('size')).toEqual('small');
      expect(modalElement.prop('close')).toEqual(modal.instance().close);

      expect(wrapper.find(TestChild).length).toEqual(1);
      done();
    });
  });

  it('Should close on Escape key in webkit browsers', done => {
    const closeSpy = jest.spyOn(Modal.prototype, 'close');
    const wrapper = mount(this.getComponent());
    const modal = wrapper.find(Modal);

    const event = {
      code: 'Escape',
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    };

    wrapper.setState({open: true}, () => {
      modal.instance().handleKeyPress(event);

      expect(closeSpy).toHaveBeenCalledTimes(1);
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();

      done();
    });
  });

  it('Should close on Escape key in internet explorer browsers', done => {
    const closeSpy = jest.spyOn(Modal.prototype, 'close');
    const wrapper = mount(this.getComponent());
    const modal = wrapper.find(Modal);

    const event = {
      key: 'Escape',
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    };

    wrapper.setState({open: true}, () => {
      modal.instance().handleKeyPress(event);

      expect(closeSpy).toHaveBeenCalledTimes(1);
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();

      done();
    });
  });

  it('Should not close on a key different than Escape', done => {
    const closeSpy = jest.spyOn(Modal.prototype, 'close');
    const wrapper = mount(this.getComponent());
    const modal = wrapper.find(Modal);

    const event = {
      key: 'F1',
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    };

    wrapper.setState({open: true}, () => {
      modal.instance().handleKeyPress(event);

      expect(closeSpy).not.toHaveBeenCalled();
      expect(event.stopPropagation).not.toHaveBeenCalled();
      expect(event.preventDefault).not.toHaveBeenCalled();

      done();
    });
  });
});

describe('<ModalElement />', function() {
  this.getComponent = () => {
    return (
      <ModalElement close={this.close}>
        <TestChild />
      </ModalElement>
    );
  };

  beforeEach(() => {
    this.close = jest.fn();
  });

  it('Should render ModalElement and children', () => {
    const wrapper = shallow(this.getComponent());
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render children and pass close as prop', () => {
    const wrapper = shallow(this.getComponent());
    const testChild = wrapper.find(TestChild);

    expect(testChild.length).toEqual(1);
    expect(testChild.prop('close')).toEqual(this.close);
  });
});
