/* eslint-disable import/prefer-default-export */
import AsyncStorage from '@react-native-community/async-storage'
import { logError } from '@utils/dev'
import appConfig from '../../app.json'

export const clearStorage = async (): Promise<boolean> => {
  const persistKey = `persist:${appConfig.name}`

  try {
    await AsyncStorage.removeItem(persistKey)
    return true
  } catch (err) {
    logError(err)
  }

  return false
}
