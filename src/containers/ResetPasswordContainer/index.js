import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doResetPassword, doCheckValidationToken } from '../../Redux/Actions/userActions';
import RessetPasswordForm from './resetPasswordForm';


class ResetPasswordContainer extends Component {
  render() {
    return (
      <RessetPasswordForm
        doResetPassword={this.props.doResetPassword}
        loading={this.props.loading}
        doCheckValidationToken={this.props.doCheckValidationToken}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doResetPassword: (data) => dispatch(doResetPassword(data)),
  doCheckValidationToken: (token) => dispatch(doCheckValidationToken(token))
});

const mapStateToProps = state => ({
  loading: state.user.loading
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
