// __mocks__/@react-native-firebase/firestore.js

const firestore = () => ({
  add: jest.fn(() => Promise.resolve(this)),
  collection: jest.fn(() => Promise.resolve(this)),
  get: jest.fn(() => Promise.resolve(this)),
  where: jest.fn(() => Promise.resolve(this)),
})

firestore.GeoPoint = jest
  .fn()
  .mockImplementation((latitude, longitude) => ({ latitude, longitude }))

export default firestore
