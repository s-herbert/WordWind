const {defaults} = require('jest-config');

module.exports ={
  globalSetup: './__tests__/setup.js',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
}