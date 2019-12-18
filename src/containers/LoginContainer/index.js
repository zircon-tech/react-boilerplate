import React, { Component } from 'react';
import { connect } from 'react-redux';
import doLoginAction from '../../redux/actions';
import Login from '../../components/auth/Login';


class LoginContainer extends Component {
  render() {
    return (
    // this.props.loading ? <Loader/> :
      <Login
        doLogin={this.props.doLogin}
        loading={this.props.loading}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doLogin: (email, password) => dispatch(doLoginAction(email, password))
});
  
const mapStateToProps = state => ({
  loading: state.loading
});
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);