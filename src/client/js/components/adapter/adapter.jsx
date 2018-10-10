import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Adapter extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = _.omit(props, 'component');
  }

  updateProps(props) {
    this.setState(props);
  }

  render() {
    return <this.props.component {...this.state} />;
  }
}

export default Adapter;
