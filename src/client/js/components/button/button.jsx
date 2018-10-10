import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    caption: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

  render() {
    const modifier = `--${this.props.type}`;

    return (
      <button className={`button ${modifier}`} onClick={this.props.onClick}>
        {this.props.caption}
      </button>
    );
  }
}

export default Button;
