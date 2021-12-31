import BackgroundFetch from 'react-native-background-fetch'
import { MINIMUM_FETCH_INTERVAL } from 'utils/constants'
export default {
  // All platforms, 15min is the minimum allowed interval
  minimumFetchInterval: MINIMUM_FETCH_INTERVAL,
  // Android only
  enableHeadless: false,
  startOnBoot: false,
  requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
}
