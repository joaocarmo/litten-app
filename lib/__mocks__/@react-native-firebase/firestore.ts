import * as admin from 'firebase-admin'

const projectId = 'litten-app'
admin.initializeApp({
  projectId,
})
const { firestore } = admin
export default firestore
