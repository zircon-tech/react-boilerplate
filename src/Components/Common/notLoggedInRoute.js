import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../../Lib/Utils/auth';

const NotLoggedInRoute = ({ component: Component, children, render, ...rest }) => (
  <Route
    {...rest}
    render={
      (props) => {
        if (!getToken()) {
          if (Component) {
            return <Component {...props} />;
          }
          if (render) {
            return render(...props);
          }
          return children;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/home',
              }}
            />
          );
        }
      }
    }
  />
);

export default NotLoggedInRoute;
