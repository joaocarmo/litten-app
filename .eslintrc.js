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
  },
}
