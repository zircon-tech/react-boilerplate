const dotenv = require('dotenv');

dotenv.config({ silent: true });
module.exports = {
  API_URL: process.env.REACT_APP_API_URL,
  API_KEY: process.env.REACT_APP_API_KEY,
  GOOGLE_AUTH_CLIENT_ID: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
  FACEBOOK_APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
};
