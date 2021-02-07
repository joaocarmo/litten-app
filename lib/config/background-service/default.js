/**
 * @format
 * @flow
 */

import BackgroundFetch from 'react-native-background-fetch'

export default {
  // All platforms, 15min is the minimum allowed interval
  minimumFetchInterval: 15,
  // Android only
  enableHeadless: false,
  startOnBoot: false,
  requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
}
