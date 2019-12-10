import React, {Component} from 'react';
import {Route, Switch, Link} from "react-router-dom";
import LoginContainer from './containers/LoginContainer';
import './App.css';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Header from './components/header/header';
import AuthLayout from './components/auth/AuthLayout';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/user">
            <Register />
          </Route>
          <Route path="/home">
            <Header/>
            <h2>Welcome to Home Page</h2>
          </Route>
          <Route exact path="/forgotPassword">
            <ForgotPassword />
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
                        to="/forgotPassword">
                        <u>Recover it</u>
                      </Link>
                    </p>
                    <Link
                      className="text-decoration text-dark"
                      to="/ressetPassword">
                      <u>Reset Password (temporal)</u>
                    </Link>
                  </>
                )
              }
            >
              <LoginContainer/>
            </AuthLayout>
          </Route>
          <Route exact path="/ressetPassword">
            <ResetPassword/>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
