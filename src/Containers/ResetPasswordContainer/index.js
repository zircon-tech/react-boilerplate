import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doResetPassword, doCheckValidationToken } from '../../Redux/Actions/userActions';
import RessetPasswordForm from '../../Components/ResetPassword';


class ResetPasswordContainer extends Component {
  render() {
    const {
      loading,
      _doResetPassword,
      _doCheckValidationToken,
      token
    } = this.props;
    return (
      <RessetPasswordForm
        loading={loading}
        doResetPassword={_doResetPassword}
        doCheckValidationToken={_doCheckValidationToken}
        token={token}
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
  loading: state.loader.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
