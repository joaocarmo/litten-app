// __mocks__/@react-native-firebase/firestore.js

const firestore = () => ({
  add: jest.fn(() => Promise.resolve(this)),
  collection: jest.fn(() => Promise.resolve(this)),
  get: jest.fn(() => Promise.resolve(this)),
  where: jest.fn(() => Promise.resolve(this)),
})

export default firestore
