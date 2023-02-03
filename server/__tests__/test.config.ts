module.exports = {
  request: require('supertest'),
  nock: require('nock'),
  port: process.env.PORT || 5000,
}
