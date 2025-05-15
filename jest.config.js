// eslint-disable-next-line import/no-anonymous-default-export
export default {
  testEnvironment: 'node',
  injectGlobals: true,
  extensionsToTreatAsEsm: ['.jsx'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testMatch: ['**/*.test.(js|jsx)'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
