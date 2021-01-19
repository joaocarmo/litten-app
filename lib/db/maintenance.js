/**
 * @format
 * @flow
 */

import Chat, { ChatError } from 'model/chat'
import { debugLog, logError } from 'utils/dev'

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
        const chat = new Chat({ id: documentSnapshot.id })
        chats.push(chat)
      })

      for (const chat of chats) {
        await chat.deleteForUser(userUid)
      }

      debugLog('[CHAT] DELETED CHATS', chats.length)
    } catch (err) {
      logError(err)
    }
  } else {
    throw new ChatError('Needs a user uid to delete all')
  }
}
