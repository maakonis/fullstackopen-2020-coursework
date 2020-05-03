require('dotenv').config();

const { MONGODB_URI } = process.env;
const { PORT } = process.env;

module.exports = {
  MONGODB_URI,
  PORT,
};
