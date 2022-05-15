const esModules = [
  '@react-native-community',
  '@react-native-picker',
  '@react-native',
  'react-native',
].join('|')

const globalConfig = {
  transformIgnorePatterns: [`node_modules/(?!(${esModules}))`],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/lib/__mocks__/fileMock.ts',
    '\\.svg$': '<rootDir>/lib/__mocks__/svgMock.ts',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}

module.exports = {
  projects: [
    {
      preset: 'react-native',
      displayName: 'default',
      setupFiles: ['<rootDir>/jest.setup.js'],
      fakeTimers: {
        enableGlobally: true,
      },
      haste: {
        defaultPlatform: 'android',
        platforms: ['android', 'ios', 'native'],
      },
      ...globalConfig,
    },
    {
      displayName: 'model',
      testEnvironment: 'node',
      testMatch: [
        '**/__model__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(model-spec|model-test).[jt]s?(x)',
      ],
      ...globalConfig,
    },
    {
      displayName: 'rules',
      testEnvironment: 'node',
      testMatch: [
        '**/__rules__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(rules-spec|rules-test).[jt]s?(x)',
      ],
      ...globalConfig,
    },
  ],
}
