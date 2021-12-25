module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    '@react-native-community',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:flowtype/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['jest', 'flowtype', 'prettier'],
  env: {
    'jest/globals': true,
  },
  rules: {
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'jest/expect-expect': 'off',
    'react/jsx-no-literals': ['error', { noStrings: false, ignoreProps: true }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.js'],
      rules: {
        'react/jsx-no-literals': 'off',
      },
    },
  ],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
}
