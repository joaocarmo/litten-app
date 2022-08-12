import Auth from '@model/auth'
import Chat from '@model/chat'
import { ChatError } from '@model/error/chat'
import User from '@model/user'
import { locationSchema } from '@db/schemas/location'
import { debugLog, logError } from '@utils/dev'
import type { AuthSettings } from '@model/types/auth'
import type { BasicUser } from '@model/types/user'

/**
 * Creates a new Authentication and User object
 * @async
 * @param {AuthSettings} authSettings Basic user information
 */
export const createNewUser = async ({
  photoURL,
  callingCode,
  country,
  displayName,
  email,
  password,
  phoneNumber,
}: AuthSettings): Promise<BasicUser | null> => {
  debugLog('[AUTH] Creating new user...')

  const userAuth = new Auth({
    photoURL,
    callingCode,
    country,
    displayName,
    email,
    password,
    phoneNumber,
  })

  await userAuth.create()

  // Create a user object to store extra user information
  const user = new User({
    id: userAuth.id,
    displayName: userAuth.displayName,
    email: userAuth.email,
    phoneNumber: userAuth.phoneNumber,
    photoURL: userAuth.photoURL,
    location: { ...locationSchema, country: userAuth.country },
  })
  let newUser = null

  try {
    debugLog('[USER] Creating new user...')
    newUser = await user.create()
  } catch (err) {
    logError(err)
    await userAuth.delete()
    throw err
  }

  // Send email verification asynchronously
  userAuth.sendEmailVerification()

  return newUser
}

/**
 * Deletes all the chats for a given user
 * @async
 * @param {string} userUid - The user's uid
 * @returns {Promise.<void>}
 */
export const deleteAllChatForUser = async (userUid: string): Promise<void> => {
  if (userUid) {
    try {
      const chatsQuerySnapshot = await Chat.queryForUser(userUid).get()
      const chats = []
      chatsQuerySnapshot.forEach((documentSnapshot) => {
        const chat = new Chat({
          id: documentSnapshot.id,
        })
        chats.push(chat)
      })

      const chatsToDelete = []

      for (const chat of chats) {
        chatsToDelete.push(chat.deleteForUser(userUid))
      }

      await Promise.all(chatsToDelete)

      debugLog('[CHAT] DELETED CHATS', chats.length)
    } catch (err) {
      logError(err)
    }
  } else {
    throw new ChatError('Needs a user uid to delete all')
  }
}
