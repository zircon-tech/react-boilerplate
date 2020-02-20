import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  getUserProfile, 
  doUpdateUserProfile,
  doChangePassword,
} from '../../Redux/Actions/userActions';
import { doShowModal, doCloseModal} from '../../Redux/Actions/modalActions';
import UserProfile from './userProfileForm';


class UserProfileContainer extends Component {
  render() {
    const {
      _getUserProfile,
      _doUpdateUserProfile,
      loading,
      currentUser,
      _doShowModal,
      _doCloseModal,
      _doChangePassword,
    } = this.props;
    return (
      <UserProfile
        getUserProfile={_getUserProfile}
        doUpdateUserProfile={_doUpdateUserProfile}
        doChangePassword={_doChangePassword}
        loading={loading}
        currentUser={currentUser}
        doShowModal={_doShowModal}
        doCloseModal={_doCloseModal}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  _getUserProfile: (data) => dispatch(getUserProfile(data)),
  _doUpdateUserProfile: (data) => dispatch(doUpdateUserProfile(data)),
  _doShowModal: (modalProps) => dispatch(doShowModal(modalProps)),
  _doCloseModal: () => dispatch(doCloseModal()),
  _doChangePassword: (data) => dispatch(doChangePassword(data)),
});

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  loading: state.loader.loading
});
  
export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
