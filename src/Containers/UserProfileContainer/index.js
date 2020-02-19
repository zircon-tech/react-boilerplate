import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserProfile, doUpdateUserProfile} from '../../Redux/Actions/userActions';
import UserProfile from './userProfileForm';


class UserProfileContainer extends Component {
  render() {
    const {
      _getUserProfile,
      _doUpdateUserProfile,
      loading,
      currentUser
    } = this.props;
    return (
      <UserProfile
        getUserProfile={_getUserProfile}
        doUpdateUserProfile={_doUpdateUserProfile}
        loading={loading}
        currentUser={currentUser}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  _getUserProfile: (data) => dispatch(getUserProfile(data)),
  _doUpdateUserProfile: (data) => dispatch(doUpdateUserProfile(data))
});

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  loading: state.loader.loading
});
  
export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
