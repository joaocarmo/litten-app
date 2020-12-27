const globalConfig = {
  preset: 'react-native',
  timers: 'fake',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-native-community/*|@react-native-picker/.*)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/lib/__mocks__/fileMock.js',
    '\\.svg$': '<rootDir>/lib/__mocks__/svgMock.js',
  },
}

module.exports = {
  projects: [
    {
      ...globalConfig,
      displayName: 'default',
    },
    {
      ...globalConfig,
      displayName: 'model',
      runner: 'jest-serial-runner',
      testMatch: [
        '**/__model__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(model-spec|serial-test).[jt]s?(x)',
      ],
      preset: undefined,
      setupFiles: undefined,
    },
  ],
}
