import React, { Component } from 'react';
import { connect } from 'react-redux';
import ForgotPasswordForm from './forgotPasswordForm';
import { doForgotPassword } from '../../Redux/Actions/userActions';

class ForgotPasswordContainer extends Component {
  render() {
    return (
      <ForgotPasswordForm
        doForgotPassword={this.props.doForgotPassword}
        loading={this.props.loading}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doForgotPassword: (email) => dispatch(doForgotPassword(email)),
});

const mapStateToProps = state => ({
  loading: state.loader.loading
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
