#!/usr/bin/env node
const admin = require('firebase-admin')
const firebase = require('firebase/compat/app')
const { initializeTestEnvironment } = require('@firebase/rules-unit-testing')
const {
  authUser,
  authUserRecord,
  chats,
  littens,
  messages,
  users,
} = require('../lib/fixtures/seed')

const projectId = 'litten-app'

const DB_CHAT_COLLECTION = 'chats'
const DB_LITTEN_COLLECTION = 'littens'
const DB_MESSAGE_COLLECTION = 'messages'
const DB_USER_COLLECTION = 'users'

admin.initializeApp({ projectId })

const parseDataDoc = (origObj) => {
  const obj = { ...origObj }

  if (obj?.location?.coordinates?.latitude) {
    obj.location.coordinates = new admin.firestore.GeoPoint(
      +obj.location.coordinates.latitude,
      +obj.location.coordinates.longitude,
    )
  }

  obj.metadata = {
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  }

  return obj
}

const cleanup = async () => {
  const testEnv = await initializeTestEnvironment({
    projectId,
  })

  console.log('Clearing existing apps...')
  await Promise.all(firebase.apps.map((app) => app.delete()))

  console.log('Clearing previous data...')
  await testEnv.clearFirestore()
}

const main = async () => {
  const auth = admin.auth()
  const db = admin.firestore()
  db.settings({ ignoreUndefinedProperties: true })
  const dbChats = db.collection(DB_CHAT_COLLECTION)
  const dbLittens = db.collection(DB_LITTEN_COLLECTION)
  const dbMessages = db.collection(DB_MESSAGE_COLLECTION)
  const dbUsers = db.collection(DB_USER_COLLECTION)

  console.log(`Seeding the Firestore DB project '${projectId}'...`)

  await cleanup()

  console.log('Clearing previous auth accounts...')
  const authList = await admin.auth().listUsers()
  const usersToDelete = []
  authList.users.forEach((user) => {
    usersToDelete.push(user.uid)
  })
  for (const userUidToDelete of usersToDelete) {
    await admin.auth().deleteUser(userUidToDelete)
  }

  console.log(`Creating the auth account '${authUser.displayName}'...`)
  const createdAuthUser = await auth.createUser(authUser)
  const authUserUid = createdAuthUser.uid

  console.log(`Adding the user account '${authUserRecord.displayName}'...`)
  users.push({ ...authUserRecord, id: authUserUid })

  for (const user of users) {
    const { id: userId, ...userObj } = user
    const userDoc = parseDataDoc(userObj)
    await dbUsers.doc(userId).set(userDoc)
  }

  console.log(`Added ${users.length} users`)

  for (const litten of littens) {
    const { id: littenId, ...littenObj } = litten
    const littenDoc = parseDataDoc(littenObj)
    await dbLittens.doc(littenId).set(littenDoc)
  }

  console.log(`Added ${littens.length} littens`)

  for (const chat of chats) {
    const { id: chatId, ...chatObj } = chat
    const chatDoc = parseDataDoc(chatObj)
    await dbChats.doc(chatId).set(chatDoc)
  }

  console.log(`Added ${chats.length} chats`)

  for (const message of messages) {
    const { id: messageId, ...messageObj } = message
    const messageDoc = parseDataDoc(messageObj)
    await dbMessages.doc(messageId).set(messageDoc)
  }

  console.log(`Added ${messages.length} messages`)

  console.log('Done')
  process.exit(0)
}

main()
