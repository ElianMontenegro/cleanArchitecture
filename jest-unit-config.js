
const config = require('./jest.config');
config.testMatch = [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec).[jt]s?(x)" ]

module.exports = config