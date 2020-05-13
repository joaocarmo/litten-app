module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    semi: 0,
    'object-curly-spacing': ['error', 'always'],
    'jest/expect-expect': 0,
    /* Enable to catch strings not going through the translation framework
    'react/jsx-no-literals': [
      'error',
      { noStrings: true, allowedStrings: ['&bull;'] },
    ],
    */
  },
}
