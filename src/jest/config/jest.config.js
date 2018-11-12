const {defaults} = require('jest-config');

module.exports = {
  rootDir: '../..',
  // globalSetup: './setup.js',
  // globalTeardown: './teardown.js',
  // testEnvironment: './mongo-env.js',
  collectCoverage: true,
  coverageReporters: ['lcov'];
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
}