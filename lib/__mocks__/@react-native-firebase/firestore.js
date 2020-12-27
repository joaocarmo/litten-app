// __mocks__/@react-native-firebase/firestore.js
import * as admin from 'firebase-admin'

const projectId = 'litten-app'
const fakeUser = {
  id: 'fakeUserUid',
  displayName: 'John Doe',
  email: 'johndoe@litten.app',
}
const auth = { uid: fakeUser.id, email: fakeUser.email, email_verified: true }
admin.initializeApp({ auth, projectId })

const firestore = admin.firestore

const dateNow = new Date().valueOf()

firestore.FieldValue = {
  serverTimestamp: jest.fn(() => ({
    seconds: dateNow,
    _seconds: dateNow,
  })),
}

firestore.GeoPoint = jest
  .fn()
  .mockImplementation((latitude, longitude) => ({ latitude, longitude }))

export default firestore
