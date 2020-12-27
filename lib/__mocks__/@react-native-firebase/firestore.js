// __mocks__/@react-native-firebase/firestore.js
import * as admin from 'firebase-admin'

const projectId = 'litten-app'

admin.initializeApp({ projectId })

const firestore = admin.firestore

export default firestore
