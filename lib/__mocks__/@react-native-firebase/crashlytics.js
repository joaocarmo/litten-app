// __mocks__/@react-native-firebase/crashlytics.js

const crashlytics = () => ({
  log: jest.fn(),
  isCrashlyticsCollectionEnabled: true,
  setCrashlyticsCollectionEnabled: jest.fn(() => Promise.resolve(true)),
})

export default crashlytics
