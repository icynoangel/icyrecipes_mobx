import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Radio extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    label: 'Radio option',
    checked: false,
    disabled: false
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.disabled) {
      if (!this.props.checked) {
        this.props.onClick(this.props.value);
      }
    }
  }

  render() {
    const classes = classNames({
      radio: true,
      '--checked': this.props.checked,
      '--disabled': this.props.disabled
    });

    return (
      <div className={classes} onClick={this.onClick}>
        <div className="radio__button">
          <div className="radio__button__checked" />
        </div>
        <div className="radio__label">{this.props.label}</div>
      </div>
    );
  }
}

export default Radio;
