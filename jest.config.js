module.exports = {
  preset: 'react-native',
  timers: 'fake',
  setupFiles: [
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-native-community/*|react-navigation|react-navigation-stack|@react-navigation/.*|@react-native-picker/.*)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/lib/__mocks__/fileMock.js',
    '\\.svg$': '<rootDir>/lib/__mocks__/svgMock.js',
  },
}
