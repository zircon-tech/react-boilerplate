import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './auth/auth';

class PrivateRoute extends Component {
  render() {
    const { component: Component } = this.props;
    const accessToken = getToken();

    return (
      <Route
        render={
          () => {
            if (accessToken) {
              return (
                <Component />
              );
            }
            return (
              <Redirect
                to={{
                  pathname: '/login',
                }}
              />
            );
          }
        }
      />
    );
  }
}
export default PrivateRoute;
