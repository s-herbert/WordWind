const {defaults} = require('jest-config');

module.exports ={
  globalSetup: './setup.js',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
}