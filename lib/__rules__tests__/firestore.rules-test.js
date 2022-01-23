/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync } = require('fs')
const testing = require('@firebase/rules-unit-testing')
const {
  // doc,
  // getDoc,
  // setDoc,
  // serverTimestamp,
  setLogLevel,
} = require('firebase/firestore')

const { assertFails, assertSucceeds, initializeTestEnvironment } = testing

const projectId = 'litten-app'

const USERS_COLLECTION = 'users'
const LITTENS_COLLECTION = 'littens'
const CHATS_COLLECTION = 'chats'
const MESSAGES_COLLECTION = 'messages'

const fakeUser1 = {
  id: 'fakeUser1',
  displayName: 'Alice',
  email: 'alice@litten.app',
  email_verified: false,
}
const fakeUser2 = {
  id: 'fakeUser2',
  displayName: 'Bob',
  email: 'bob@litten.app',
  email_verified: false,
}
const fakeUser3 = {
  id: 'fakeUser3',
  displayName: 'Cheshire',
  email: 'cheshire@litten.app',
  email_verified: true,
}
const fakeDisplayName = 'Mary Poppins'
const fakeLitten = {
  title: 'Kitty Cat',
}
const fakeChat = {
  littenUid: 'fakeLittenUid',
}
const fakeMessage = {
  chatUid: 'fakeChatUid',
}

/** @type testing.RulesTestEnvironment */
let testEnv

beforeAll(async () => {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests).
  setLogLevel('error')

  testEnv = await initializeTestEnvironment({
    projectId,
    firestore: { rules: readFileSync('firestore.rules', 'utf8') },
  })
})

afterAll(async () => {
  // Delete all the FirebaseApp instances created during testing.
  // Note: this does not affect or clear any data.
  await testEnv.cleanup()
})

beforeEach(async () => {
  await testEnv.clearFirestore()
})

describe(`Tests the ${USERS_COLLECTION}`, () => {
  it('does not create a new user if unauthenticated', async () => {
    const anonymousApp = testEnv.unauthenticatedContext()

    await assertFails(
      anonymousApp
        .firestore()
        .collection(USERS_COLLECTION)
        .doc(fakeUser1.id)
        .set({ displayName: fakeUser1.displayName, email: fakeUser1.email }),
    )
  })

  it('creates a new user if authenticated', async () => {
    const authenticatedApp = testEnv.authenticatedContext(fakeUser1.id, {
      email: fakeUser1.email,
      email_verified: fakeUser1.email_verified,
    })

    await assertSucceeds(
      authenticatedApp
        .firestore()
        .collection(USERS_COLLECTION)
        .doc(fakeUser1.id)
        .set({ displayName: fakeUser1.displayName, email: fakeUser1.email }),
    )
  })

  it('does not edit a user if different', async () => {
    const authenticatedApp = testEnv.authenticatedContext(fakeUser2.id, {
      email: fakeUser2.email,
      email_verified: fakeUser2.email_verified,
    })

    await assertFails(
      authenticatedApp
        .firestore()
        .collection(USERS_COLLECTION)
        .doc(fakeUser1.id)
        .update({ displayName: fakeDisplayName }),
    )
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('edits a user if same', async () => {
    const verifiedApp = testEnv.authenticatedContext(fakeUser3.id, {
      email: fakeUser3.email,
      email_verified: fakeUser3.email_verified,
    })

    await assertSucceeds(
      verifiedApp
        .firestore()
        .collection(USERS_COLLECTION)
        .doc(fakeUser3.id)
        .update({ displayName: fakeDisplayName }),
    )
  })
})

describe(`Tests the ${USERS_COLLECTION}`, () => {
  it('does not create a new litten if unverified', async () => {
    const authenticatedApp = testEnv.authenticatedContext(fakeUser1.id, {
      email: fakeUser1.email,
      email_verified: fakeUser1.email_verified,
    })

    await assertFails(
      authenticatedApp
        .firestore()
        .collection(LITTENS_COLLECTION)
        .add(fakeLitten),
    )
  })

  it('creates a new litten if verified', async () => {
    const verifiedApp = testEnv.authenticatedContext(fakeUser3.id, {
      email: fakeUser3.email,
      email_verified: fakeUser3.email_verified,
    })

    await assertSucceeds(
      verifiedApp.firestore().collection(LITTENS_COLLECTION).add(fakeLitten),
    )
  })

  it('does not create a new chat if litten does not exist', async () => {
    const authenticatedApp = testEnv.authenticatedContext(fakeUser1.id, {
      email: fakeUser1.email,
      email_verified: fakeUser1.email_verified,
    })

    await assertFails(
      authenticatedApp.firestore().collection(CHATS_COLLECTION).add(fakeChat),
    )
  })

  it('creates a new chat if litten exists', async () => {
    const verifiedApp = testEnv.authenticatedContext(fakeUser3.id, {
      email: fakeUser3.email,
      email_verified: fakeUser3.email_verified,
    })
    const authenticatedApp = testEnv.authenticatedContext(
      fakeUser1.displayName,
      {
        email: fakeUser1.email,
        email_verified: fakeUser1.email_verified,
      },
    )

    verifiedApp
      .firestore()
      .collection(LITTENS_COLLECTION)
      .doc(fakeChat.littenUid)
      .set(fakeLitten)

    await assertSucceeds(
      authenticatedApp.firestore().collection(CHATS_COLLECTION).add(fakeChat),
    )
  })

  it('creates a new message', async () => {
    const verifiedApp = testEnv.authenticatedContext(fakeUser3.id, {
      email: fakeUser3.email,
      email_verified: fakeUser3.email_verified,
    })
    const authenticatedApp = testEnv.authenticatedContext(
      fakeUser1.displayName,
      {
        email: fakeUser1.email,
        email_verified: fakeUser1.email_verified,
      },
    )

    verifiedApp
      .firestore()
      .collection(LITTENS_COLLECTION)
      .doc(fakeMessage.chatUid)
      .set(fakeChat)

    await assertSucceeds(
      authenticatedApp
        .firestore()
        .collection(MESSAGES_COLLECTION)
        .add(fakeMessage),
    )
  })
})
