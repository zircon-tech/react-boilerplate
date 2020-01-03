import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Loader from '../../Components/loader';
import { form_rules } from '../../Lib/Utils/validations';
import { setToken } from '../../Lib/Utils/auth';
import constants from '../../Lib/Utils/constants';
import RegisterModal from '../../Components/RegisterModal';
import PasswordInput from '../../Components/Common/passwordInput';


const useValidatedField = (initialState) => {
  const validator = form_rules;
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

const LoginForm = ({ 
  loading, 
  doLogin, 
  doLoginWGoogle, 
  history 
}) => {
  const [error, setError] = useState('');
  const [data, setData] = useState('');
  const [validation, credentials, setCredentials] = useValidatedField({email: '', password: ''});
  const [submmited, setSubmitted] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [googleToken, setGoogleToken] = useState('');
  const [hidden, setHidden] = useState(true);
  
  
  useEffect(() => {
    error && setError('');
  }, [credentials]); 

  const handleCheckLogin = async () => {
    setSubmitted(true);
    if (validation.isValid) {
      const response = await doLogin(credentials.email, credentials.password);
      if (response) {
        history.push('/home');
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
    doLoginWGoogle(
      googleToken,
      profile
    ).then(
      (apiResponse) => {
        callToLoginRegisterWithGoogle(apiResponse);
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
          <PasswordInput 
            className={classnames("form-control", {'is-invalid': submmited && validation.password.isInvalid})}
            name="password"
            onChange={
              (e) => {
                setCredentials({...credentials, password: e.target.value});
              } 
            } 
            placeholder="Password"
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
        
        <GoogleLogin
          clientId={constants.GOOGLE_AUTH_CLIENT_ID}
          onSuccess={
            (googleResponse) => {
              setGoogleToken(googleResponse.tokenId);
              doLoginWGoogle(
                googleResponse.tokenId,
              ).then(
                (apiResponse) => {
                  callToLoginRegisterWithGoogle(apiResponse);
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
                  Login with Google
              </button>
            )
          }
        />
      </>    
    )
  );
};

LoginForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  doLogin: PropTypes.func.isRequired
};
export default withRouter(LoginForm);