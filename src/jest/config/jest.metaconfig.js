const {defaults} = require('jest-config');

module.exports = {
  rootDir: '../../..',
  verbose: true,
  testMatch:["**/jest/__tests__/**.spec.js"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
}