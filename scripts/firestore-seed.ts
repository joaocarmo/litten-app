#!/usr/bin/env ts-node
import { deleteApp, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { FieldValue, getFirestore, GeoPoint } from 'firebase-admin/firestore'
import { initializeTestEnvironment } from '@firebase/rules-unit-testing'
import {
  authUser,
  authUserRecord,
  chats,
  littens,
  messages,
  users,
} from '../lib/fixtures/seed'
import {
  DB_CHAT_COLLECTION,
  DB_LITTEN_COLLECTION,
  DB_MESSAGE_COLLECTION,
  DB_USER_COLLECTION,
} from '../lib/utils/constants/app'

const projectId = 'litten-app'

const print = (message: string) => console.log(message)

const parseDataDoc = (origObj: Record<string, any>) => {
  const obj = { ...origObj }

  if (obj?.location?.coordinates?.latitude) {
    obj.location.coordinates = new GeoPoint(
      +obj.location.coordinates.latitude,
      +obj.location.coordinates.longitude,
    )
  }

  obj.metadata = {
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }

  return obj
}

const cleanup = async () => {
  const testEnv = await initializeTestEnvironment({
    projectId,
  })

  print('Clearing existing apps...')
  await Promise.all(getApps().map((app) => deleteApp(app))).catch(console.error)

  print('Clearing previous data...')
  await testEnv.clearFirestore()
}

const main = async () => {
  print(`Seeding the Firestore DB project '${projectId}'...`)

  await cleanup()

  const app = initializeApp({ projectId })
  const auth = getAuth(app)
  const db = getFirestore(app)

  db.settings({ ignoreUndefinedProperties: true })

  const dbChats = db.collection(DB_CHAT_COLLECTION)
  const dbLittens = db.collection(DB_LITTEN_COLLECTION)
  const dbMessages = db.collection(DB_MESSAGE_COLLECTION)
  const dbUsers = db.collection(DB_USER_COLLECTION)

  print('Clearing previous auth accounts...')
  const authList = await auth.listUsers()
  const usersToDelete: string[] = []
  authList.users.forEach((user) => {
    usersToDelete.push(user.uid)
  })
  for (const userUidToDelete of usersToDelete) {
    await auth.deleteUser(userUidToDelete)
  }

  print(`Creating the auth account '${authUser.displayName}'...`)
  const createdAuthUser = await auth.createUser(authUser)
  const authUserUid = createdAuthUser.uid

  print(`Adding the user account '${authUserRecord.displayName}'...`)
  // @ts-ignore
  users.push({ ...authUserRecord, id: authUserUid })

  for (const user of users) {
    const { id: userId, ...userObj } = user
    const userDoc = parseDataDoc(userObj)
    await dbUsers.doc(userId).set(userDoc)
  }

  print(`Added ${users.length} users`)

  for (const litten of littens) {
    const { id: littenId, ...littenObj } = litten
    const littenDoc = parseDataDoc(littenObj)
    await dbLittens.doc(littenId).set(littenDoc)
  }

  print(`Added ${littens.length} littens`)

  for (const chat of chats) {
    const { id: chatId, ...chatObj } = chat
    const chatDoc = parseDataDoc(chatObj)
    await dbChats.doc(chatId).set(chatDoc)
  }

  print(`Added ${chats.length} chats`)

  for (const message of messages) {
    const { id: messageId, ...messageObj } = message
    const messageDoc = parseDataDoc(messageObj)
    await dbMessages.doc(messageId).set(messageDoc)
  }

  print(`Added ${messages.length} messages`)

  await Promise.resolve(() => {
    print('Done')
    process.exit(0)
  })
}

main()
