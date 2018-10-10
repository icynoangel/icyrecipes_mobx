import {connect} from 'react-redux';
import Notification from './../notification/notification';

const mapStateToProps = state => {
  return {
    ui: state.ui
  };
};

const NotificationProvider = connect(mapStateToProps)(Notification);

export default NotificationProvider;
