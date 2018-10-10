import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Dropdown extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.string, // --auto
    items: PropTypes.array.isRequired
  };

  static defaultProps = {
    placeholder: 'Select...',
    type: 'medium',
    width: ''
  };

  constructor(props) {
    super(props);

    const selected = props.items.find(item => {
      return item.selected;
    });

    this.state = {
      selected: selected ? selected.value : '',
      isOpen: false
    };

    this.addListeners = this.addListeners.bind(this);
    this.removeListeners = this.removeListeners.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.controlOnClick = this.controlOnClick.bind(this);

    this.itemRef = React.createRef();
    this.contentRef = React.createRef();
  }

  addListeners() {
    window.addEventListener('click', this.handleDocumentClick, false);
    window.addEventListener('touchend', this.handleDocumentClick, false);
  }

  removeListeners() {
    window.removeEventListener('click', this.handleDocumentClick);
    window.removeEventListener('touchend', this.handleDocumentClick);
  }

  controlOnClick(event) {
    this.setState({
      isOpen: !this.state.isOpen
    });

    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  handleDocumentClick() {
    this.setState({
      isOpen: false
    });
  }

  onClick(value) {
    if (this.state.selected !== value) {
      this.setState(
        {
          selected: value,
          isOpen: false
        },
        () => {
          this.props.onChange(value);
        }
      );
    }
  }

  item(item, ref) {
    const classes = classNames({
      dropdown__content__option: true,
      '--selected': this.state.selected === item.value
    });
    return (
      <div
        key={`dropdown-option-${item.value}`}
        className={classes}
        onClick={this.onClick.bind(this, item.value)}
        {...ref}
      >
        {item.label}
      </div>
    );
  }

  get options() {
    return (
      <div className="dropdown__content" ref={this.contentRef}>
        {this.props.items.map((item, index) => {
          const props = index ? {} : {ref: this.itemRef};
          return this.item(item, props);
        })}
      </div>
    );
  }

  render() {
    const selectedLabel =
      this.state.selected !== ''
        ? this.props.items.find(item => {
            return item.value === this.state.selected;
          }).label
        : this.props.placeholder;

    const classes = classNames({
      dropdown: true,
      '--open': this.state.isOpen,
      [`--${this.props.type}`]: true,
      [`--${this.props.width}`]: this.props.width.length
    });

    return (
      <div className={classes}>
        <div className="dropdown__control" onClick={this.controlOnClick}>
          <div className="dropdown__control__select">{selectedLabel}</div>
          <div className="dropdown__control__arrow" />
        </div>
        {this.state.isOpen && this.options}
      </div>
    );
  }

  componentDidMount() {
    this.addListeners();
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      const selected = this.props.items.find(item => {
        return item.selected;
      });

      if (selected) {
        this.setState({
          selected: selected.value
        });
      } else {
        this.setState({
          selected: ''
        });
      }
    }

    if (this.state.isOpen) {
      const index = this.props.items.findIndex(item => {
        return item.value === this.state.selected;
      });
      this.contentRef.current.scrollTop =
        this.itemRef.current.offsetHeight * index;
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }
}

export default Dropdown;
