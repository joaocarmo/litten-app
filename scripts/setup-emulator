#!/usr/bin/env node
const admin = require('firebase-admin')
const readline = require('readline')

const projectId = 'litten-app'
const usersCollection = 'users'
const commonPassword = 'thisisthepassword'

const EMAIL_EXISTS = 'auth/email-already-exists'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

admin.initializeApp({ projectId })

const main = async () => {
  const auth = admin.auth()
  const db = admin.firestore()
  const users = db.collection(usersCollection)

  const usersSnapshot = await users.get()
  usersSnapshot.forEach(async (doc) => {
    const user = { ...doc.data(), id: doc.id }

    if (user.email) {
      try {
        await auth.createUser({
          displayName: user.displayName,
          email: user.email,
          password: commonPassword,
          uid: user.id,
        })
      } catch (err) {
        if (err.code === EMAIL_EXISTS) {
          console.log('Email already exists', user.email)
        } else {
          throw err
        }
      }
    }
  })

  // Keep firebase emulator alive
  rl.question('Hit CTRL+C to close\n', () => undefined)
}

main()
