import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import PrivateRoute from "../Components/Common/privateRoute";
import NotLoggedInRoute from "../Components/Common/notLoggedInRoute";
import AuthLayout from "../Components/Layouts/authLayout";
import LoggedLayout from "../Components/Layouts/loggedLayout";
import LoginContainer from "../Containers/LoginContainer";
import Home from "../Containers/HomeContainer";
import Register from "../Containers/RegisterContainer";
import UserProfile from "../Containers/UserProfileContainer";
import ForgotPassword from "../Containers/ForgotContainer";
import AcceptInvitation from "../Containers/AcceptInvitationContainer";
import SendInvitation from "../Containers/SendInvitationContainer";
import ResetPassword from "../Containers/ResetPasswordContainer";


const RouterComponent = ({children}) => (
  <Router>
    <Switch>
      <PrivateRoute path="/home">
        <LoggedLayout header="Home">
          <Home/>
        </LoggedLayout>
      </PrivateRoute>
      <PrivateRoute path="/send_invitation">
        <AuthLayout header="Invite User">
          <SendInvitation />
        </AuthLayout>
      </PrivateRoute>
      <NotLoggedInRoute
        path="/accept_invitation"
        render={
          (props) => {
            const query = new URLSearchParams(props.location.search);
            const token = query.get('token');
            // const token = props.location.match.token;
            return (
              <LoggedLayout header="User Invitation">
                <AcceptInvitation
                  token={token}
                />
              </LoggedLayout>
            );
          }
        }
      />
      <NotLoggedInRoute path="/user">
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
      <NotLoggedInRoute
        exact
        path="/reset_password"
        render={
          (props) => {
            const query = new URLSearchParams(props.location.search);
            const token = query.get('token');
            // const token = props.location.match.token;
            return (
              <AuthLayout header="Recover Password">
                <ResetPassword
                  token={token}
                />
              </AuthLayout>
            );
          }
        }
      >
      </NotLoggedInRoute>
      <Route path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
    {children}
  </Router>
);

export default RouterComponent;
