import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  doLogin, 
  doLoginWGoogle,
  doLoginWFB,
  doLoginWTwitter,
} from '../../Redux/Actions/userActions';
import LoginForm from './LoginForm';


class LoginContainer extends Component {
  render() {
    const { 
      _doLogin,
      loading,
      _doLoginWGoogle,
      _doLoginWFB,
      _doLoginWTwitter
    } = this.props;
    return (
    // this.props.loading ? <Loader/> :

      <LoginForm
        doLogin={_doLogin}
        loading={loading}
        doLoginWGoogle={_doLoginWGoogle}
        doLoginWFB={_doLoginWFB}
        doLoginWTwitter={_doLoginWTwitter}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  _doLogin: (email, password) => dispatch(doLogin(email, password)),
  _doLoginWGoogle: (accessToken, user) => dispatch(doLoginWGoogle(accessToken, user)),
  _doLoginWFB: (fbResponse, user) => dispatch(doLoginWFB(fbResponse, user)),
  _doLoginWTwitter: (accessToken, oauth_verifier, user) => {
    dispatch(doLoginWTwitter(accessToken, oauth_verifier, user));
  }
});
  
const mapStateToProps = state => ({
  loading: state.user.loading
});
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);