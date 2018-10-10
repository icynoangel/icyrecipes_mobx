import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from './button';
import Modal from '../modal/modal';
import ModalConfirmation from '../modal/modal-confirmation';
import {inject, observer} from 'mobx-react';

@inject('ItemsStore')
@observer
class Buttons extends Component {
  static propTypes = {
    ItemsStore: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.openConfirmationModal = this.openConfirmationModal.bind(this);
  }

  openConfirmationModal() {
    this.refs.confirmationModal.open();
  }

  onConfirm() {
    console.log('Confirmed pressed');
  }

  onDeny() {
    console.log('Deny pressed');
  }

  render() {
    return (
      <div className="buttons">
        <Button
          key="button-request-items"
          onClick={this.props.ItemsStore.getItems}
          caption="Get Items"
          type="primary"
        />
        <Button
          key="open-confirmation-modal"
          onClick={this.openConfirmationModal}
          caption="Open Modal"
          type="primary"
        />
        <Modal ref="confirmationModal">
          <ModalConfirmation
            description="Please confirm or deny"
            onConfirm={this.onConfirm}
            onDeny={this.onDeny}
          />
        </Modal>
      </div>
    );
  }
}

export default Buttons;
