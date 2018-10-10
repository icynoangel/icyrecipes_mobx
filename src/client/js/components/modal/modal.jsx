import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.object.isRequired,
    size: PropTypes.string
  };

  static defaultProps = {
    size: 'small'
  };

  state = {
    open: false
  };

  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.addListeners = this.addListeners.bind(this);
    this.removeListeners = this.removeListeners.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.el = document.createElement('div');
  }

  close() {
    this.setState({
      open: false
    });
    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  }

  open() {
    this.setState({
      open: true
    });
  }

  handleKeyPress(event) {
    const code = event.code || event.key; // webkit & iexplorer

    if (code === 'Escape') {
      this.close();

      event.stopPropagation();
      event.preventDefault();
      return false;
    }
  }

  addListeners() {
    this.el
      .getElementsByClassName('modal__overlay')[0]
      .addEventListener('click', this.close, false);
    window.addEventListener('keydown', this.handleKeyPress, false);
  }

  removeListeners() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    if (this.state.open) {
      return ReactDOM.createPortal(
        <ModalElement close={this.close} size={this.props.size}>
          {this.props.children}
        </ModalElement>,
        this.el
      );
    }

    return null;
  }

  componentDidUpdate() {
    const modalEl = document.getElementById('modal');
    if (this.state.open) {
      modalEl.appendChild(this.el);
      this.addListeners();
    } else {
      modalEl.removeChild(this.el);
      this.removeListeners();
    }
  }
}

export class ModalElement extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="modal">
        <div className="modal__overlay" />
        <div className={`modal__content --${this.props.size}`}>
          {React.cloneElement(React.Children.only(this.props.children), {
            close: this.props.close
          })}
        </div>
      </div>
    );
  }
}

export default Modal;
