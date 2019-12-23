import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";
import ResetPassword from "../components/auth/ResetPassword";
import AuthLayout from "../components/auth/AuthLayout";

import LoginContainer from "../containers/LoginContainer";
import Home from "../containers/HomeContainer";
import Register from "../containers/RegisterContainer";
import ForgotPassword from "../containers/ForgotContainer";

const RouterComponent = () => (
  <Router>
    <Switch>
      <PrivateRoute path="/home">
        <Home />
      </PrivateRoute>
      <Route path="/user">
        <Register />
      </Route>
      <Route exact path="/forgot_password">
        <AuthLayout header="Recover Password">
          <ForgotPassword />
        </AuthLayout>
      </Route>
      <Route exact path="/login">
        <AuthLayout
          header="Login"
          links={
            <>
              <p className="mt-5">
                Register{" "}
                <Link className="text-decoration text-dark" to="/user">
                  <u>Create an account</u>
                </Link>
              </p>
              <p>
                Forgot password?{" "}
                <Link
                  className="text-decoration text-dark"
                  to="/forgot_password"
                >
                  <u>Recover it</u>
                </Link>
              </p>
            </>
          }
        >
          <LoginContainer />
        </AuthLayout>
      </Route>
      <Route exact path="/reset_password">
        <AuthLayout header="Recover Password">
          <ResetPassword />
        </AuthLayout>
      </Route>
      <Route path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  </Router>
);

export default RouterComponent;
