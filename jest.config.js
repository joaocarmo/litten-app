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
      timers: 'fake',
      haste: {
        defaultPlatform: 'android',
        platforms: ['android', 'ios', 'native'],
      },
      ...globalConfig,
    },
    {
      displayName: 'model',
      testEnvironment: 'node',
      timers: 'real',
      testMatch: [
        '**/__model__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(model-spec|serial-test).[jt]s?(x)',
      ],
      ...globalConfig,
    },
  ],
}
