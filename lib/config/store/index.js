/**
 * @format
 * @flow
 */

import { APP_IS_DEV, USE_REDUX_DEVTOOLS_LOCAL_SERVER } from 'utils/env'
import AsyncStorage from '@react-native-community/async-storage'
import appConfig from '../../../app.json'

const devToolsConfig: any = USE_REDUX_DEVTOOLS_LOCAL_SERVER
  ? {
      realtime: APP_IS_DEV,
      name: appConfig.name,
      hostname: 'localhost',
      port: 8000,
    }
  : {}

const persistConfig = {
  key: appConfig.name,
  version: 1,
  storage: AsyncStorage,
  blacklist: [
    'appSettings',
    'formLogin',
    'formProfile',
    'formRegister',
    'formReport',
  ],
}

export { devToolsConfig, persistConfig }
