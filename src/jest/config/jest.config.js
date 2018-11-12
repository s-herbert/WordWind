const {defaults} = require('jest-config');
const { readFileSync } = require('fs')
const babelConfig = JSON.parse(readFileSync(__dirname+'/../../../.babelrc', 'utf8'))

require('@babel/register')(babelConfig)
require('@babel/polyfill')

module.exports = {
  rootDir: '../../..',
  verbose: true,
  // globalSetup: './src/jest/setup.js',
  // globalTeardown: './src/jest/teardown.js',
  // testEnvironment: './src/jest/config/mongo-env.js',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
}