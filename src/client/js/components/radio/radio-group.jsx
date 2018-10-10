import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Radio from './radio';

class RadioGroup extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  };

  static defaultProps = {
    label: 'Radio group'
  };

  static getDerivedStateFromProps(props) {
    const selected = props.items.find(item => {
      return item.checked;
    }).value;

    return {
      selected
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      selected: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState(
      {
        selected: value
      },
      () => {
        this.props.onChange(value);
      }
    );
  }

  render() {
    return (
      <div className="radio-group">
        <div className="radio-group__label">{this.props.label}</div>
        <div className="radio-group__content">
          {this.props.items.map(item => {
            return (
              <Radio
                key={`radio-${item.value}`}
                label={item.label}
                value={item.value}
                checked={this.state.selected === item.value}
                disabled={item.disabled}
                onClick={this.onChange}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default RadioGroup;
