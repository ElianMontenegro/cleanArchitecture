const config = require('./jest.config');
config.testMatch = [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)" ]

module.exports = config