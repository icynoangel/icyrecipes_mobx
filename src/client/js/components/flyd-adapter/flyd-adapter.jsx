import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import flyd from 'flyd';

class FlydAdapter extends Component {
  static propTypes = {
    stream: PropTypes.func.isRequired,
    component: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = props.stream();
  }

  render() {
    return <this.props.component {...this.state} />;
  }

  componentDidMount() {
    flyd.on(newProps => {
      this.setState(newProps);
    }, this.props.stream);
  }
}

export const stream = props => {
  return flyd.stream(props);
};

export default FlydAdapter;
