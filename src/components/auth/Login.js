import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import FormValidator from '../FormValidator';
import { setToken } from './auth';


const rules = [
  { 
    field: 'email', 
    method: 'isEmpty', 
    validWhen: false, 
    message: 'Email is required.' 
  },
  { 
    field: 'email',
    method: 'isEmail', 
    validWhen: true, 
    message: 'That is not a valid email.'
  },
  { 
    field: 'password', 
    method: 'isEmpty', 
    validWhen: false, 
    message: 'Password is required.'
  },
  { 
    field: 'password', 
    method: 'matches',
    args: [/^.*(?=.{6,}).*$/], 
    validWhen: true, 
    message: 'Password must have at least 6 characters.'
  },
];
const useValidatedField = (initialState) => {
  const validator = new FormValidator(rules);
  const [credentials, setCredentials] = useState(initialState);
  const [validation, setValidation] = useState(validator.validate(credentials));
  return [
    validation,
    credentials,
    (newFields) => {
      setValidation(validator.validate(newFields));
      setCredentials(newFields);
    },
  ];
};

const Login = ({ loading, doLogin, history }) => {
  const [error, setError] = useState('');
  const [validation, credentials, setCredentials] = useValidatedField({email: '', password: ''});
  const [submmited, setSubmitted] = useState(false);

  useEffect(() => {
    error && setError('');
  }, [credentials]); 

  const handleCheckLogin = async () => {
    setSubmitted(true);
        
    if (validation.isValid) {
      try {
        const response = await doLogin(credentials.email, credentials.password);
        setToken(response.data.jwtToken);
        history.push('/home');
      } catch (Error) {
        setError('The user or password was incorrect!, please try again.');
      }
    }
  };
   
  return (
    loading ? <Loader/> : (  
      <>  
        <div className="form-group">
          <input 
            className={classnames("form-control", {'is-invalid': submmited && validation.email.isInvalid})}
            name="email" 
            onChange={
              (e) => {
                setCredentials({...credentials, email: e.target.value});
              } 
            }
            placeholder="Email" 
            type="text"
            value={credentials.email}
          />
          <span className="text-muted">{submmited && validation.email.message}</span>
        </div>
        <div className="form-group">
          <input 
            className={classnames("form-control", {'is-invalid': submmited && validation.password.isInvalid})}
            name="password"
            onChange={
              (e) => {
                setCredentials({...credentials, password: e.target.value});
              } 
            } 
            placeholder="Password"
            type="password"
            value={credentials.password}
          />
          <span className="text-muted">{submmited && validation.password.message}</span>
        </div>
        <div className="mb-4">
          <span className="text-danger">{error}</span>
        </div>
        <div>
          <button type="button" onClick={handleCheckLogin} name="Login" className="btn btn-primary">Login</button>
        </div>  
      </>    
    )
  );
};

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  doLogin: PropTypes.func.isRequired
};
export default withRouter(Login);