const crashlytics = () => ({
  isCrashlyticsCollectionEnabled: true,
  log: jest.fn(),
  recordError: jest.fn(),
  setCrashlyticsCollectionEnabled: jest.fn(() => Promise.resolve(true)),
})

export default crashlytics
