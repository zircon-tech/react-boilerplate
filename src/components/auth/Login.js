import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import FormValidator from '../FormValidator';
import { setToken } from './auth';
import constants from '../../lib/utils/constants';
import * as userService from '../../services/api/user.service';
import RegisterModal from './RegisterModal';


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
  const [data, setData] = useState('');
  const [validation, credentials, setCredentials] = useValidatedField({email: '', password: ''});
  const [submmited, setSubmitted] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [googleToken, setGoogleToken] = useState('');
  
  
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
  
  const callToLoginRegisterWithGoogle = (apiResponse) => {
    if (apiResponse.data.jwtToken) {
      setToken(apiResponse.data.jwtToken);
      history.push('/home');
    } else { 
      if (apiResponse.data.isInfoMissing) {
        setData(apiResponse.data.infoMissing);
      }
      setRegisterModal(true);
    }
  };

  const onRegisterModalSubmit = (profile) => {
    userService.loginWGoogle(
      googleToken,
      profile
    ).then(
      (apiResponse) => {
        callToLoginRegisterWithGoogle(apiResponse);
      }
    ).catch(
      (apiResponseError) => {
        console.log(apiResponseError);
        // this.setState({
        //  error: (error instanceof ClientError) ? error.message : "Internal Error"
        // });
      }
    );
  };

  return (
    loading ? <Loader/> : (  
      <> 
        <RegisterModal 
          modal={registerModal}
          submitHandler={onRegisterModalSubmit}
          setModal={setRegisterModal}
          size="lg"
          data={data}
        />
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
          {/* <button type="button" onClick={() => setRegisterModal(true)} name="Login" className="btn btn-primary">test</button>  */}
        </div>
        
        <GoogleLogin
          clientId={constants.GOOGLE_AUTH_CLIENT_ID}
          onSuccess={
            (googleResponse) => {
              setGoogleToken(googleResponse.tokenId);
              userService.loginWGoogle(
                googleResponse.tokenId,
              ).then(
                (apiResponse) => {
                  callToLoginRegisterWithGoogle(apiResponse);
                }
              ).catch(
                (apiResponseError) => {
                  console.log(apiResponseError);
                  // this.setState({
                  //  error: (error instanceof ClientError) ? error.message : "Internal Error"
                  // });
                }
              );
            }
          }
          onFailure={
            ({rejectError, details}) => {
              console.log(rejectError, details);
            }
          }
          render={
            ({onClick}) => (
              <button
                type="button"
                className="btn bg-white text-dark btn-sm btn-block font-weight-light mt-4 py-2"
                onClick={onClick}
              >
                <i className="fab fa-google text-g-plus fa-fw mr-3"/>
                  Log In with Google
              </button>
            )
          }
        />
      </>    
    )
  );
};

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  doLogin: PropTypes.func.isRequired
};
export default withRouter(Login);