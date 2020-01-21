const constants = {
  ...process.env,
  GOOGLE_AUTH_CLIENT_ID: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
  FACEBOOK_APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
  // final point URL where the component can send the verification_code 
  // to finalize the authentication process.
  twitterAuthenticationURL: '/auth/twitter/access-token',
  // final point URL where the component can request to the server a request_token.
  twitterRequestTokenURL: '/auth/twitter/request-token',
};

export default constants;
