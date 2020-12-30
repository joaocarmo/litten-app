#!/usr/bin/env node
const {
  apps,
  assertFails,
  assertSucceeds,
  clearFirestoreData,
  initializeTestApp,
} = require('@firebase/rules-unit-testing')

const projectId = 'litten-app'
const fakeUser = {
  id: 'fakeUserUid',
  displayName: 'John Doe',
  email: 'johndoe@litten.app',
}
const fakeUser2 = {
  id: 'fakeUserUid2',
  displayName: 'Jane Doe',
  email: 'jane@litten.app',
}
const fakeLitten = {
  title: 'Kitty Cat',
}
const fakeChat = {
  littenUid: 'fakeLittenUid',
}
const fakeMessage = {
  chatUid: 'fakeChatUid',
}
const { id: fakeUserId, ...fakeUserDoc } = fakeUser
const { id: fakeUserId2 } = fakeUser2
const auth = { uid: fakeUserId, email: fakeUser.email, email_verified: false }
const auth2 = {
  uid: fakeUserId2,
  email: fakeUser2.email,
  email_verified: false,
}
const verifiedAuth = { ...auth, email_verified: true }

const main = async () => {
  const anonymousApp = initializeTestApp({ projectId })
  const authenticatedApp = initializeTestApp({ auth, projectId })
  const authenticatedApp2 = initializeTestApp({ auth: auth2, projectId })
  const verifiedApp = initializeTestApp({ auth: verifiedAuth, projectId })

  console.log('Does not create a new user if unauthenticated')
  await assertFails(
    anonymousApp
      .firestore()
      .collection('users')
      .doc(fakeUserId)
      .set(fakeUserDoc),
  )

  console.log('Creates a new user if authenticated')
  await assertSucceeds(
    authenticatedApp
      .firestore()
      .collection('users')
      .doc(fakeUserId)
      .set(fakeUserDoc),
  )

  console.log('Does not edit a user if different')
  await assertFails(
    authenticatedApp2
      .firestore()
      .collection('users')
      .doc(fakeUserId)
      .update({ displayName: 'Mary Poppins' }),
  )

  console.log('Edits a user if same')
  await assertSucceeds(
    verifiedApp
      .firestore()
      .collection('users')
      .doc(fakeUserId)
      .update({ displayName: 'Mary Poppins' }),
  )

  console.log('Does not create a new litten if unverified')
  await assertFails(
    authenticatedApp.firestore().collection('littens').add(fakeLitten),
  )

  console.log('Creates a new litten if verified')
  await assertSucceeds(
    verifiedApp.firestore().collection('littens').add(fakeLitten),
  )

  console.log('Does not create a new chat if litten does not exist')
  await assertFails(
    authenticatedApp.firestore().collection('chats').add(fakeChat),
  )

  console.log('Creates a new chat if litten exists')
  verifiedApp
    .firestore()
    .collection('littens')
    .doc(fakeChat.littenUid)
    .set(fakeLitten)
  await assertSucceeds(
    authenticatedApp.firestore().collection('chats').add(fakeChat),
  )

  console.log('Creates a new message')
  verifiedApp
    .firestore()
    .collection('littens')
    .doc(fakeMessage.chatUid)
    .set(fakeChat)
  await assertSucceeds(
    authenticatedApp.firestore().collection('messages').add(fakeMessage),
  )

  console.log('Clearing apps...')
  await Promise.all(apps().map((app) => app.delete()))

  console.log('Clearing test data...')
  await clearFirestoreData({ projectId })

  console.log('Done')
  process.exit(0)
}

main()
