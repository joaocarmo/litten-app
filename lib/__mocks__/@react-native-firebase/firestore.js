// __mocks__/@react-native-firebase/firestore.js

const collection = jest.fn(() => {
  return {
    doc: jest.fn(() => {
      return {
        add: jest.fn(() => Promise.resolve(true)),
        collection: collection,
        get: jest.fn(() => Promise.resolve(true)),
        onSnapshot: jest.fn(() => Promise.resolve(true)),
        update: jest.fn(() => Promise.resolve(true)),
        where: jest.fn(() => Promise.resolve(true)),
      }
    }),
    where: jest.fn(() => {
      return {
        get: jest.fn(() => Promise.resolve(true)),
        onSnapshot: jest.fn(() => Promise.resolve(true)),
      }
    }),
  }
})

const Firestore = () => {
  return {
    collection,
  }
}

Firestore.FieldValue = {
  serverTimestamp: jest.fn(() => ({
    seconds: 0,
    _seconds: 0,
  })),
}

Firestore.GeoPoint = jest
  .fn()
  .mockImplementation((latitude, longitude) => ({ latitude, longitude }))

export default Firestore
