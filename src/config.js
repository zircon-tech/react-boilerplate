const dotenv = require('dotenv');

dotenv.config({ silent: true });
module.exports = {API_URL: process.env.REACT_APP_API_URL, API_KEY: process.env.REACT_APP_API_KEY};  