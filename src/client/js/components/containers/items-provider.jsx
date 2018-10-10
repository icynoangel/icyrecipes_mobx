import {connect} from 'react-redux';
import Items from './../items/items';

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const ItemsProvider = connect(mapStateToProps)(Items);

export default ItemsProvider;
