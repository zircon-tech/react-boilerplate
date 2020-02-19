import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import GoogleLogin from "react-google-login";
import TwitterLogin from "react-twitter-auth";
import FacebookLogin from "react-facebook-login";
import classnames from "classnames";
import PropTypes from "prop-types";
import Loader from "../../Components/Common/loader";
import { form_rules } from "../../Lib/Utils/validations";
import { setToken } from "../../Lib/Utils/auth";
import constants from "../../Lib/Utils/constants";
import RegisterModal from "../../Components/RegisterModal";
import PasswordInput from "../../Components/Common/passwordInput";
import PasswordValidationBox from '../../Components/PasswordValidation/passwordValidationBox';
import { API_URL, GOOGLE_AUTH_CLIENT_ID, FACEBOOK_APP_ID } from "../../config";

const useValidatedField = initialState => {
  const validator = form_rules;
  const [credentials, setCredentials] = useState(initialState);
  const [validation, setValidation] = useState(validator.validate(credentials));
  return [
    validation,
    credentials,
    newFields => {
      setValidation(validator.validate(newFields));
      setCredentials(newFields);
    }
  ];
};

const LoginForm = ({
  loading,
  doLogin,
  doLoginWGoogle,
  doLoginWFB,
  doLoginWTwitter,
  history
}) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [validation, credentials, setCredentials] = useValidatedField({
    email: "",
    password: ""
  });
  const [submmited, setSubmitted] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [googleToken, setGoogleToken] = useState("");

  useEffect(() => {
    error && setError("");
  }, [credentials]);

  const handleCheckLogin = async () => {
    setSubmitted(true);
    if (validation.isValid) {
      const response = await doLogin(credentials.email, credentials.password).catch(() => {});
      if (response) {
        history.push("/home");
      }
    }
  };

  const callToLoginRegisterWithGoogle = apiResponse => {
    if (apiResponse.data.jwtToken) {
      setToken(apiResponse.data.jwtToken);
      history.push("/home");
    } else {
      if (apiResponse.data.isInfoMissing) {
        setData(apiResponse.data.infoMissing);
      }
      setRegisterModal(true);
    }
  };

  const onRegisterModalSubmit = profile => {
    doLoginWGoogle(googleToken, profile).then(apiResponse => {
      callToLoginRegisterWithGoogle(apiResponse);
    });
  };

  return loading ? (
    <Loader />
  ) : (
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
          className={classnames("form-control", {
            "is-invalid": submmited && validation.email.isInvalid
          })}
          name="email"
          onChange={e => {
            setCredentials({ ...credentials, email: e.target.value });
          }}
          placeholder="Email"
          type="text"
          value={credentials.email}
        />
        <span className="text-muted">
          {submmited && validation.email.message}
        </span>
      </div>
      <div className="form-group">
        <PasswordInput
          className={classnames("form-control", {
            "is-invalid": submmited && validation.password.isInvalid
          })}
          name="password"
          onChange={e => {
            setCredentials({ ...credentials, password: e.target.value });
          }}
          onFocus={() => setShow(true)}
          placeholder="Password"
          value={credentials.password}
        />
        <span className="text-muted">
          {submmited && validation.password.message}
        </span>
      </div>
      {
        show ? (
          <PasswordValidationBox
            password={credentials.password}
          />
        ) : null
      }
      <div className="mb-4">
        <span className="text-danger">{error}</span>
      </div>
      <div>
        <button
          type="button"
          onClick={handleCheckLogin}
          name="Login"
          className="btn btn-primary"
        >
          Login
        </button>
      </div>
      <TwitterLogin
        className="btn btn-twit bg-white btn-sm btn-block font-weight-light mb-2 mt-4 py-2"
        showIcon={false}
        dialogWidth={600}
        dialogHeight={400}
        loginUrl={API_URL + constants.twitterAuthenticationURL}
        requestTokenUrl={API_URL + constants.twitterRequestTokenURL}
        onFailure={error => {
          // this.setState({error: error.message});
        }}
        onSuccess={twResponse => {
          twResponse
            .json()
            .then(apiResponse => {
              // this.afterApiInvokeTw(apiResponse);
            })
            .catch(error => {
              // this.setState({
              //   error: (error instanceof ClientError) ? error.message : 'Internal Error'
              // });
            });
        }}
      >
        <i className="fab fa-twitter fa-fw mr-3" />
        Log In with Twitter
      </TwitterLogin>
      {/* <FacebookLogin
          appId={FACEBOOK_APP_ID}
          autoLoad={false}
          redirectUri={API_URL}
          disableMobileRedirect
          onClick={
            (
              <button
                type="button"
                className="btn btn-face btn-sm btn-block font-weight-light mb-2 py-2"
              >
                <i className="fab fa-facebook-f fa-fw mr-3"/>
                Sign Up with Facebook
              </button>
            )
          }
          callback={
            (fbResponse) => {
              if (fbResponse) {
                doLoginWFB(
                  fbResponse,
                  null
                ).then(
                  (apiResponse) => {
                    // this.afterApiInvokeFB(fbResponse, apiResponse);
                  }
                ).catch(
                  (error) => {
                    // this.setState({
                    //   error: (error instanceof ClientError) ? error.message : 'Internal Error'
                    // });
                  }
                );
              }
            }
          }
          cssClass="btn btn-face bg-white btn-sm btn-block font-weight-light mb-2 py-2"
          textButton="Log In with Facebook"
          icon="fab fa-facebook-f fa-fw mr-3"
        /> */}
      <GoogleLogin
        clientId={GOOGLE_AUTH_CLIENT_ID}
        onSuccess={googleResponse => {
          setGoogleToken(googleResponse.tokenId);
          doLoginWGoogle(googleResponse.tokenId).then(apiResponse => {
            callToLoginRegisterWithGoogle(apiResponse);
          });
        }}
        onFailure={({ rejectError, details }) => {
          console.log(rejectError, details);
        }}
        render={({ onClick }) => (
          <button
            type="button"
            className="btn btn-google bg-white text-dark btn-sm btn-block font-weight-light py-2"
            onClick={onClick}
          >
            <i className="fab fa-google text-g-plus fa-fw mr-3" />
            Login with Google
          </button>
        )}
      />
    </>
  );
};

LoginForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  doLogin: PropTypes.func.isRequired,
  doLoginWGoogle: PropTypes.func.isRequired,
  doLoginWFB: PropTypes.func.isRequired,
  doLoginWTwitter: PropTypes.func.isRequired
};
export default withRouter(LoginForm);
