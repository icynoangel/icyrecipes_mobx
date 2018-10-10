import {connect} from 'react-redux';
import {getItems} from './../../actions/items-actions';

import Buttons from './../button/buttons';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getItems: () => {
      dispatch(getItems());
    }
  };
};

const ButtonsProvider = connect(mapStateToProps, mapDispatchToProps)(Buttons);

export default ButtonsProvider;
