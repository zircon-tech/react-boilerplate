import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getUserProfile as _getUserProfile,
  doUpdateUserProfile as _doUpdateUserProfile,
  doChangePassword as _doChangePassword,
} from '../../Redux/Actions/userActions';
import {
  doShowModal as _doShowModal,
  doCloseModal as _doCloseModal,
} from '../../Redux/Actions/modalActions';
import UserProfile from './userProfileForm';

const UserProfileContainer = (
  {
    getUserProfile,
    loading,
    currentUser,
    doUpdateUserProfile,
    doChangePassword,
    doShowModal,
    doCloseModal,
  }
) => (
  <UserProfile
    getUserProfile={getUserProfile}
    doUpdateUserProfile={doUpdateUserProfile}
    doChangePassword={doChangePassword}
    doShowModal={doShowModal}
    doCloseModal={doCloseModal}
    loading={loading}
    currentUser={currentUser}
  />
);

const mapDispatchToProps = dispatch => ({
  getUserProfile: (data) => dispatch(_getUserProfile(data)),
  doUpdateUserProfile: (data) => dispatch(_doUpdateUserProfile(data)),
  doChangePassword: (data) => dispatch(_doChangePassword(data)),
  doShowModal: (modalProps) => dispatch(_doShowModal(modalProps)),
  doCloseModal: () => dispatch(_doCloseModal()),
});

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  loading: state.loader.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
