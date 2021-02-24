require('dotenv').config()

let PORT = process.env.PORT
let MONBODB_URI = process.env.MONGODB_URI

module.exports = {
  MONBODB_URI,
  PORT
}
