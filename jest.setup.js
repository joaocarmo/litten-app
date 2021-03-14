require('jest-fetch-mock').enableMocks()

const mockRNGestureHandlerModule =
  'react-native-gesture-handler/dist/src/__mocks__/RNGestureHandlerModule.js'

const mockRNCNetInfo = '@react-native-community/netinfo/jest/netinfo-mock.js'

jest.mock('react-native-gesture-handler', () => mockRNGestureHandlerModule)

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo)

jest.mock('react-native-simple-toast', () => ({
  LONG: jest.fn(),
  SHORT: jest.fn(),
}))

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {}

  return Reanimated
})

// Silence the warning:
//   Animated: `useNativeDriver` is not supported because the native animated
//   module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
