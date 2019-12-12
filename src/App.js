import React, {Component} from 'react';
import {
  Route, 
  Switch, 
  Link,
  Redirect,
} from "react-router-dom";
import LoginContainer from './containers/LoginContainer';
import './App.css';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Header from './components/header/header';
import AuthLayout from './components/auth/AuthLayout';
import PrivateRoute from './components/PrivateRoute';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/user">
            <Register />
          </Route>
          <PrivateRoute path="/home" component={Header} />
          {/* <h2>Welcome to Home Page</h2> */}
          <Route exact path="/forgot_password">
            <AuthLayout
              header="Recover Password"
            >
              <ForgotPassword/>
            </AuthLayout>
          </Route>
          <Route exact path="/login">
            <AuthLayout
              header="Login"
              links={
                (
                  <>
                    <p className="mt-5">Register{' '}
                      <Link
                        className="text-decoration text-dark"
                        to="/user"
                      >
                        <u>Create an account</u>
                      </Link>
                    </p>
                    <p>Forgot password?{' '}
                      <Link
                        className="text-decoration text-dark"
                        to="/forgot_password">
                        <u>Recover it</u>
                      </Link>
                    </p>
                  </>
                )
              }
            >
              <LoginContainer/>
            </AuthLayout>
          </Route>
          <Route exact path="/reset_password">
            <AuthLayout 
              header="Recover Password"
            >
              <ResetPassword/>
            </AuthLayout>
          </Route>
          <Route path="/">
            <Redirect to="/home"/>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
