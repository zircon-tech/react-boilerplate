import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../../Lib/Utils/auth';

class PrivateRoute extends Component {
  render() {
    const {
      component: Component, 
      render, 
      children, 
      ...rest 
    } = this.props;
    const accessToken = getToken();

    return (
      <Route
        {...rest}
        render={
          (...props) => {
            if (accessToken) {
              if (Component) {
                return <Component />;
              }
              if (render) {
                return render(...props);
              } 
              return children;
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
