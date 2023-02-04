/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as admin from 'firebase-admin'

const projectId = 'litten-app'

admin.initializeApp({
  projectId,
})

const { firestore } = admin

// @ts-ignore
firestore().useEmulator = jest.fn()
// @ts-ignore
firestore.setLogLevel = jest.fn()

export default firestore
