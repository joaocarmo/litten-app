import { RemoteReduxDevToolsOptions } from 'remote-redux-devtools'
import { APP_IS_DEV, USE_REDUX_DEVTOOLS_LOCAL_SERVER } from '@utils/env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import appConfig from '../../../app.json'

const devToolsConfig: RemoteReduxDevToolsOptions =
  USE_REDUX_DEVTOOLS_LOCAL_SERVER
    ? {
        hostname: 'localhost',
        name: appConfig.name,
        port: 8000,
        realtime: APP_IS_DEV,
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
