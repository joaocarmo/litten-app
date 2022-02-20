const alias = require('./alias.config')

module.exports = (api) => {
  api.cache(true)

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./lib'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias,
        },
      ],
      [
        'dotenv-import',
        {
          allowUndefined: false,
          moduleName: '@env',
          path: '.env',
          safe: false,
          whitelist: [
            'FIREBASE_AUTH_EMULATOR_HOST',
            'FIREBASE_STORAGE_EMULATOR_HOST',
            'FIRESTORE_EMULATOR_HOST',
            'FIRESTORE_EMULATOR_PERSISTENCE',
            'GOOGLE_API_KEY',
            'IS_BETA_RELASE',
            'JIRA_API_KEY',
            'JIRA_EMAIL',
            'SLACK_WEBHOOK_URL',
            'USE_FIREBASE_EMULATOR',
            'USE_GRAVATAR',
            'USE_REDUX_DEVTOOLS_LOCAL_SERVER',
          ],
        },
      ],
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
        },
      ],
      ['macros'],
      'react-native-reanimated/plugin',
    ],
  }
}
