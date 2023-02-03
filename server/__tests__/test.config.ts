module.exports = {
  request: require('supertest'),
  nock: require('nock'),
  port: process.env.PORT || 5000,
  testCharacter1: {
    fighterId: 1,
    displayName: 'testDisplayName1',
    fighter: 'testName1',
    rosterId: 1
  },
  testCharacter2: {
    fighterId: 2,
    displayName: 'testDisplayName2',
    fighter: 'testName2',
    rosterId: 2
  }
}
