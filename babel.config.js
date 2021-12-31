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
          alias: {
            '@components': './lib/components',
            '@config': './lib/config',
            '@data': './lib/data',
            '@db': './lib/db',
            '@fixtures': './lib/fixtures',
            '@forms': './lib/forms',
            '@hooks': './lib/hooks',
            '@images': './lib/images',
            '@model': './lib/model',
            '@screens': './lib/screens',
            '@store': './lib/store',
            '@structure': './lib/structure',
            '@styles': './lib/styles',
            '@templates': './lib/templates',
            '@translations': './lib/translations',
            '@ui-elements': './lib/ui-elements',
            '@utils': './lib/utils',
          },
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
