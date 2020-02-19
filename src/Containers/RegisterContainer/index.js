import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doRegister } from '../../Redux/Actions/userActions';
import RegisterForm from './RegisterForm';


class RegisterContainer extends Component {
  render() {
    return (
      <RegisterForm
        doRegister={this.props.doRegister}
        loading={this.props.loading}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doRegister: (data) => dispatch(doRegister(data))
});

const mapStateToProps = state => ({
  loading: state.loading
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
