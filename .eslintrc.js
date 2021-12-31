module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
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
      files: ['**/__tests__/**/*.{js,jsx,ts,tsx}'],
      rules: {
        'react/jsx-no-literals': 'off',
      },
    },
  ],
}
