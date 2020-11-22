/**
 * @format
 * @flow
 */

import AsyncStorage from '@react-native-community/async-storage'
import { logError } from 'utils/dev'
import appConfig from '../../app.json'

export const clearStorage = async () => {
  const persistKey = `persist:${appConfig.name}`
  try {
    await AsyncStorage.removeItem(persistKey)
    return true
  } catch (err) {
    logError(err)
  }
  return false
}
