const remoteConfig = () => ({
  setDefaults: jest.fn(() => Promise.resolve(true)),
  fetchAndActivate: jest.fn(() => Promise.resolve(true)),
})

export default remoteConfig
