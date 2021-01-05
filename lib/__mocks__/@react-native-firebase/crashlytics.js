// __mocks__/@react-native-firebase/crashlytics.js

const crashlytics = () => ({
  isCrashlyticsCollectionEnabled: true,
  log: jest.fn(),
  recordError: jest.fn(),
  setCrashlyticsCollectionEnabled: jest.fn(() => Promise.resolve(true)),
})

export default crashlytics
