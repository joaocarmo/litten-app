/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync } = require('fs')
const testing = require('@firebase/rules-unit-testing')
const {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  setLogLevel,
  updateDoc,
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
  id: 'fakeLitten',
  title: 'Kitty Cat',
}
const fakeChat = {
  id: 'fakeChat',
  littenUid: fakeLitten.id,
}
const fakeMessage = {
  id: 'fakeMessage',
  chatUid: fakeChat.id,
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

describe(`Tests common access to the DB`, () => {
  it('should not let unauthenticated users to read documents', async () => {
    // Setup: Create a user in the DB for testing (bypassing Security Rules)
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(
        doc(context.firestore(), `${USERS_COLLECTION}/randdocument`),
        { displayName: fakeDisplayName },
      )
    })

    const unauthedDB = testEnv.unauthenticatedContext().firestore()

    // Then test security rules by trying to read it using the client SDK
    await assertFails(
      getDoc(doc(unauthedDB, `${USERS_COLLECTION}/randdocument`)),
    )
  })

  it('should not allow users to read from a random collection', async () => {
    const authenticatedDB = testEnv
      .authenticatedContext(fakeUser1.id, {
        email: fakeUser1.email,
        email_verified: fakeUser1.email_verified,
      })
      .firestore()

    await assertFails(
      getDoc(doc(authenticatedDB, 'randcollection/randdocument')),
    )
  })
})

describe(`Tests the ${USERS_COLLECTION} collection`, () => {
  it('does not create a new user if unauthenticated', async () => {
    const unauthedDB = testEnv.unauthenticatedContext().firestore()

    await assertFails(
      setDoc(doc(unauthedDB, `${USERS_COLLECTION}/${fakeUser1.id}`), {
        displayName: fakeUser1.displayName,
        email: fakeUser1.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }),
    )
  })

  it('creates a new user if authenticated', async () => {
    const authenticatedDB = testEnv
      .authenticatedContext(fakeUser1.id, {
        email: fakeUser1.email,
        email_verified: fakeUser1.email_verified,
      })
      .firestore()

    await assertSucceeds(
      setDoc(doc(authenticatedDB, `${USERS_COLLECTION}/${fakeUser1.id}`), {
        displayName: fakeUser1.displayName,
        email: fakeUser1.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }),
    )
  })

  it('does not edit a user if different', async () => {
    // Setup: Create a user in the DB for testing (bypassing Security Rules)
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(
        doc(context.firestore(), `${USERS_COLLECTION}/${fakeUser1.id}`),
        {
          displayName: fakeUser1.displayName,
          email: fakeUser1.email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
      )
    })

    // Authenticate as a different user
    const authenticatedDB = testEnv
      .authenticatedContext(fakeUser2.id, {
        email: fakeUser2.email,
        email_verified: fakeUser2.email_verified,
      })
      .firestore()

    await assertFails(
      updateDoc(doc(authenticatedDB, `${USERS_COLLECTION}/${fakeUser1.id}`), {
        displayName: fakeDisplayName,
        updatedAt: serverTimestamp(),
      }),
    )
  })

  it('edits a user if same', async () => {
    // Setup: Create a user in the DB for testing (bypassing Security Rules)
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(
        doc(context.firestore(), `${USERS_COLLECTION}/${fakeUser3.id}`),
        {
          displayName: fakeUser3.displayName,
          email: fakeUser3.email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
      )
    })

    // Authenticate as the same user
    const authenticatedDB = testEnv
      .authenticatedContext(fakeUser3.id, {
        email: fakeUser3.email,
        email_verified: fakeUser3.email_verified,
      })
      .firestore()

    await assertSucceeds(
      updateDoc(doc(authenticatedDB, `${USERS_COLLECTION}/${fakeUser3.id}`), {
        displayName: fakeDisplayName,
        updatedAt: serverTimestamp(),
      }),
    )
  })
})

describe(`Tests the ${LITTENS_COLLECTION} collection`, () => {
  it('does not create a new litten if unverified', async () => {
    const authenticatedDB = testEnv
      .authenticatedContext(fakeUser1.id, {
        email: fakeUser1.email,
        email_verified: fakeUser1.email_verified,
      })
      .firestore()

    await assertFails(
      addDoc(collection(authenticatedDB, LITTENS_COLLECTION), fakeLitten),
    )
  })

  it('creates a new litten if verified', async () => {
    const verifiedDB = testEnv
      .authenticatedContext(fakeUser3.id, {
        email: fakeUser3.email,
        email_verified: fakeUser3.email_verified,
      })
      .firestore()

    await assertSucceeds(
      addDoc(collection(verifiedDB, LITTENS_COLLECTION), {
        id: fakeLitten.id,
      }),
    )
  })
})

describe(`Tests the ${CHATS_COLLECTION} collection`, () => {
  it('does not create a new chat if litten does not exist', async () => {
    // Setup: Create a litten in the DB for testing (bypassing Security Rules)
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(
        doc(context.firestore(), `${LITTENS_COLLECTION}/randdocument`),
        { title: fakeLitten.title },
      )
    })

    const authenticatedDB = testEnv
      .authenticatedContext(fakeUser1.id, {
        email: fakeUser1.email,
        email_verified: fakeUser1.email_verified,
      })
      .firestore()

    await assertFails(
      addDoc(collection(authenticatedDB, CHATS_COLLECTION), {
        littenUid: fakeLitten.id,
      }),
    )
  })

  it('creates a new chat if litten exists', async () => {
    // Setup: Create a litten in the DB for testing (bypassing Security Rules)
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(
        doc(context.firestore(), `${LITTENS_COLLECTION}/${fakeLitten.id}`),
        { title: fakeLitten.title },
      )
    })

    const authenticatedDB = testEnv
      .authenticatedContext(fakeUser1.id, {
        email: fakeUser1.email,
        email_verified: fakeUser1.email_verified,
      })
      .firestore()

    await assertSucceeds(
      addDoc(collection(authenticatedDB, CHATS_COLLECTION), {
        littenUid: fakeLitten.id,
      }),
    )
  })
})

describe(`Tests the ${MESSAGES_COLLECTION} collection`, () => {
  it('does not create a new message if chat does not exist', async () => {
    // Setup: Create a chat in the DB for testing (bypassing Security Rules)
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(
        doc(context.firestore(), `${CHATS_COLLECTION}/randdocument`),
        { littenUid: fakeChat.littenUid },
      )
    })

    const authenticatedDB = testEnv
      .authenticatedContext(fakeUser1.id, {
        email: fakeUser1.email,
        email_verified: fakeUser1.email_verified,
      })
      .firestore()

    await assertFails(
      addDoc(collection(authenticatedDB, MESSAGES_COLLECTION), {
        chatUid: fakeMessage.chatUid,
      }),
    )
  })

  it('creates a new message if chat exists', async () => {
    // Setup: Create a chat in the DB for testing (bypassing Security Rules)
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(
        doc(context.firestore(), `${CHATS_COLLECTION}/${fakeChat.id}`),
        { littenUid: fakeChat.littenUid },
      )
    })

    const authenticatedDB = testEnv
      .authenticatedContext(fakeUser1.id, {
        email: fakeUser1.email,
        email_verified: fakeUser1.email_verified,
      })
      .firestore()

    await assertSucceeds(
      addDoc(collection(authenticatedDB, MESSAGES_COLLECTION), {
        chatUid: fakeMessage.chatUid,
      }),
    )
  })
})
