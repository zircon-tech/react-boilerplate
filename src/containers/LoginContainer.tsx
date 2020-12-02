import React from 'react';
import { connect } from 'react-redux';
import doLoginAction from '../redux/actions';
import Login from '../components/auth/Login';

interface IProps {
  doLogin: any;
  loading: any;
}

const LoginContainer = ({ doLogin, loading }: IProps) => {
  return (
    // this.props.loading ? <Loader/> :
    <Login doLogin={doLogin} loading={loading} />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  doLogin: (email: any, password: any) =>
    dispatch(doLoginAction(email, password)),
});

const mapStateToProps = (state: any) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
