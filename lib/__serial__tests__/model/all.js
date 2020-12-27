/**
 * @format
 */

import { apps, clearFirestoreData } from '@firebase/rules-unit-testing'
import Chat from 'model/chat'
import Litten from 'model/litten'
import Message from 'model/message'
import User from 'model/user'
import { chats, littens, messages, users } from 'fixtures/test'

const projectId = 'litten-app'
const createdIds = {
  chats: [],
  littens: [],
  messages: [],
  users: [],
}

const mapName = (key) => (object) =>
  Object.assign(object, {
    toString: function () {
      return this[key]
    },
  })

afterAll(async () => {
  await Promise.all(apps().map((app) => app.delete()))

  await clearFirestoreData({ projectId })
})

describe('Test the User model', () => {
  it.each(users.map(mapName('displayName')))(
    'creates the user "%s"',
    async (user) => {
      const newUser = new User(user)
      const res = await newUser.create()
      expect(res).not.toBeNull()
      expect(newUser.id).not.toHaveLength(0)
      createdIds.users.push(newUser.id)
    },
  )
})

describe('Test the Litten model', () => {
  it.each(littens.map(mapName('title')))(
    'creates the litten "%s"',
    async ({ id, ...newLittenObject }) => {
      const newLitten = new Litten(newLittenObject)
      const res = await newLitten.create()
      expect(res).not.toBeNull()
      expect(newLitten.id).not.toHaveLength(0)
      createdIds.littens.push(newLitten.id)
    },
  )
})

describe('Test the Chat model', () => {
  it.each(chats.map(mapName('id')))(
    'creates the chat "%s"',
    async ({ id, ...newChatObject }) => {
      newChatObject.littenUid = createdIds.littens.shift()
      const newChat = new Chat(newChatObject)
      const res = await newChat.create()
      expect(res).not.toBeNull()
      expect(newChat.id).not.toHaveLength(0)
      createdIds.chats.push(newChat.id)
    },
  )
})

describe('Test the Message model', () => {
  it.each(messages.map(mapName('text')))(
    'creates the message "%s"',
    async ({ id, ...newMessageObject }) => {
      newMessageObject.chatUid = createdIds.chats.shift()
      const newMessage = new Message(newMessageObject)
      const res = await newMessage.create()
      expect(res).not.toBeNull()
      expect(newMessage.id).not.toHaveLength(0)
      createdIds.messages.push(newMessage.id)
    },
  )
})
