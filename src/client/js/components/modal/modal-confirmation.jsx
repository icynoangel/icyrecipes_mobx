import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '../button/button';

class ModalConfirmation extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onDeny: PropTypes.func.isRequired
  };

  static defaultProps = {
    close: () => {
      console.warn('Close was not passed to ModalElement');
    }
  };

  constructor(props) {
    super(props);

    this.confirm = this.confirm.bind(this);
    this.deny = this.deny.bind(this);
  }

  confirm() {
    this.props.onConfirm();
    this.props.close();
  }

  deny() {
    this.props.onDeny();
    this.props.close();
  }

  render() {
    return (
      <div className="modal-confirmation">
        <div className="modal-confirmation__description">
          {this.props.description}
        </div>
        <div className="modal-confirmation__buttons">
          <Button
            key="confirm"
            type="primary"
            onClick={this.confirm}
            caption="Confirm"
          />
          <Button
            key="deny"
            type="secondary"
            onClick={this.deny}
            caption="Deny"
          />
        </div>
      </div>
    );
  }
}

export default ModalConfirmation;
