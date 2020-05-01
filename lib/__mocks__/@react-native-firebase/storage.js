// __mocks__/@react-native-firebase/storage.js

const storage = () => ({
  ref: jest.fn(() => Promise.resolve(true)),
  putFile: jest.fn(() => Promise.resolve(true)),
  getDownloadURL: jest.fn(() => Promise.resolve(true)),
})

export default storage
