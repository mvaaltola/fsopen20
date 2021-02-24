require('dotenv').config()

let PORT = process.env.PORT
let MONBODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONBODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONBODB_URI,
  PORT
}
