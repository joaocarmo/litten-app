// __mocks__/react-native-expo-viewport-units.js

const vh = jest.fn()

const vw = jest.fn((val) => 7.5 * val)

export { vh, vw }
