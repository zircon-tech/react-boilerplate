import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import PrivateRoute from "../Components/Common/privateRoute";
import AuthLayout from "../Components/Layouts/authLayout";
import LoginContainer from "../Containers/LoginContainer";
import Home from "../Containers/HomeContainer";
import Register from "../Containers/RegisterContainer";
import UserProfile from "../Containers/UserProfileContainer";
import ForgotPassword from "../Containers/ForgotContainer";
import ResetPassword from "../Containers/ResetPasswordContainer";
import NotLoggedInRoute from "../Components/Common/notLoggedInRoute";
import LoggedLayout from "../Components/Layouts/loggedLayout";


const RouterComponent = ({children}) => (
  <Router>
    <Switch>
      <PrivateRoute path="/home">
        <Home />
      </PrivateRoute>
      <NotLoggedInRoute exact path="/user">
        <Register />
      </NotLoggedInRoute>
      <NotLoggedInRoute exact path="/forgot_password">
        <AuthLayout header="Recover Password">
          <ForgotPassword />
        </AuthLayout>
      </NotLoggedInRoute>
      <PrivateRoute path="/user-profile">
        <LoggedLayout>
          <UserProfile />
        </LoggedLayout>
      </PrivateRoute>
      <NotLoggedInRoute exact path="/login">
        <AuthLayout
          header="Login"
          links={(
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
          )}
        >
          <LoginContainer />
        </AuthLayout>
      </NotLoggedInRoute>
      <NotLoggedInRoute exact path="/reset_password">
        <AuthLayout header="Recover Password">
          <ResetPassword />
        </AuthLayout>
      </NotLoggedInRoute>
      <Route path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
    {children}
  </Router>
);

export default RouterComponent;
