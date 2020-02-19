import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doResetPassword, doCheckValidationToken } from '../../Redux/Actions/userActions';
import RessetPasswordForm from './resetPasswordForm';


class ResetPasswordContainer extends Component {
  render() {
    const {
      _doResetPassword,
      loading,
      _doCheckValidationToken
    } = this.props;
    return (
      <RessetPasswordForm
        doResetPassword={_doResetPassword}
        loading={loading}
        doCheckValidationToken={_doCheckValidationToken}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  _doResetPassword: (data) => dispatch(doResetPassword(data)),
  _doCheckValidationToken: (token) => dispatch(doCheckValidationToken(token))
});

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  loading: state.loading
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
