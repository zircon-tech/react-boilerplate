import React, { Component } from 'react';
import { connect } from 'react-redux';
import {doLogin, doLoginWGoogle } from '../../Redux/Actions/userActions';
import LoginForm from './LoginForm';


class LoginContainer extends Component {
  render() {
    return (
    // this.props.loading ? <Loader/> :
      <LoginForm
        doLogin={this.props.doLogin}
        loading={this.props.loading}
        doLoginWGoogle={this.props.doLoginWGoogle}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doLogin: (email, password) => dispatch(doLogin(email, password)),
  doLoginWGoogle: (accessToken, user) => dispatch(doLoginWGoogle(accessToken, user)),
});
  
const mapStateToProps = state => ({
  loading: state.user.loading
});
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);