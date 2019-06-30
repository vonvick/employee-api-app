require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const dialect = 'postgres';
let url;

switch(env) {
  case 'test':
    url = process.env.TEST_DATABASE_URL;
    break;
  case 'development':
    url = process.env.DEV_DATABASE_URL;
    break;
  default:
    url = process.env.DATABASE_URL;
}

let devMode = false;
if ((env === 'development') || (env === 'test')) {
  devMode = true;
}
const config = {
  url,
  dialect,
  logging(str) {
    console.log(str)
  },
  dialectOptions: {
    multipleStatements: true
  }
};

if (!devMode) {
  config.ssl = true;
  config.dialectOptions.ssl = {
    require: !devMode
  };
};

module.exports = config;
