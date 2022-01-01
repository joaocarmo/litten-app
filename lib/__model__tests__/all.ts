import Chat from '@model/chat'
import Litten from '@model/litten'
import Message from '@model/message'
import User from '@model/user'
import { chats, littens, messages, users } from '@fixtures/tests'
import { cleanFirestore, mapName } from '@utils/tests'

afterAll(async () => {
  await cleanFirestore()
})

describe('Test the User model', () => {
  const testUsers = users.map(mapName('displayName'))

  it.each(testUsers)('creates the user "%s"', async (user) => {
    const newUser = new User(user)
    const res = await newUser.create()

    expect(res).not.toBeNull()
    expect(newUser.id).not.toHaveLength(0)
    expect(newUser.displayName).not.toHaveLength(0)

    const createdUser = new User({
      id: newUser.id,
    })

    await createdUser.get()

    expect(createdUser.id).toBe(user.id)
    expect(createdUser.displayName).toBe(user.displayName)
  })

  it("updates the user's name", async () => {
    const [{ id, displayName }] = testUsers
    const newDisplayName = 'Dandelion'
    const user = new User({
      id,
    })

    await user.get()

    expect(user.displayName).toBe(displayName)

    user.deferredSave = true
    user.displayName = newDisplayName

    await user.save()

    expect(user.displayName).toBe(newDisplayName)
    const updatedUser = new User({
      id,
    })

    await updatedUser.get()

    expect(updatedUser.displayName).toBe(newDisplayName)
  })
})

describe('Test the Litten model', () => {
  const testLittens = littens.map(mapName('title'))

  it.each(testLittens)(
    'creates the litten "%s"',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ id, ...newLittenObject }) => {
      const newLitten = new Litten(newLittenObject)
      const res = await newLitten.create()

      expect(res).not.toBeNull()
      expect(newLitten.id).not.toHaveLength(0)
      expect(newLitten.title).not.toHaveLength(0)

      const createdLitten = new Litten({
        id: newLitten.id,
      })

      await createdLitten.get()

      expect(createdLitten.id).toBe(newLitten.id)
      expect(createdLitten.title).toBe(newLittenObject.title)
    },
  )
})

describe('Test the Chat model', () => {
  const testChats = chats.map(mapName('id'))

  it.each(testChats)(
    'creates the chat "%s"',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ id, ...newChatObject }) => {
      const newChat = new Chat(newChatObject)
      const res = await newChat.create()

      expect(res).not.toBeNull()
      expect(newChat.id).not.toHaveLength(0)
      expect(newChat.participants).not.toHaveLength(0)

      const createdChat = new Chat({
        id: newChat.id,
      })

      await createdChat.get()

      expect(createdChat.id).toBe(newChat.id)
      expect(createdChat.participants).toEqual(newChatObject.participants)
    },
  )

  it('adds a new message to the chat', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ id, ...chatObject }] = testChats
    const {
      participants: [userUid],
    } = chatObject
    const newMessageText = 'This was a terrible idea'
    const chat = new Chat(chatObject)

    await chat.get(userUid)

    const message = new Message({
      chatUid: chat.id,
      userUid,
    })

    await chat.setLastMessage({
      lastMessage: newMessageText,
      lastMessageBy: userUid,
    })
    message.text = newMessageText

    await message.append()
    const updateChat = new Chat({
      id: chat.id,
    })

    await updateChat.get()

    expect(updateChat.lastMessage).toBe(newMessageText)
    expect(updateChat.lastMessageBy).toBe(userUid)

    const chatMessages = await message.subscribeToChat().get()

    expect(chatMessages.size).toBe(1)

    const [newChatMessage] = chatMessages.docs
    const { text: newChatMessageText, userUid: newChatMessageUserUid } =
      newChatMessage.data()

    expect(newChatMessageText).toBe(newMessageText)
    expect(newChatMessageUserUid).toBe(userUid)
  })

  it('deletes chat for the first participant', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ id, ...chatObject }] = testChats
    const {
      participants: [userUid],
    } = chatObject
    const chat = new Chat(chatObject)

    await chat.get(userUid)

    expect(chat.id).not.toHaveLength(0)
    expect(chat.participants).toEqual(chatObject.participants)

    await chat.deleteForUser(userUid)

    expect(chat.participants).not.toContain(userUid)

    const updatedChat = new Chat({
      id: chat.id,
    })

    await updatedChat.get()

    expect(updatedChat.participants).not.toContain(userUid)
    const updatedChatForUser = new Chat(chatObject)

    await chat.get(userUid)

    expect(updatedChatForUser.id).toHaveLength(0)
  })

  it('deletes chat for the second participant (removing it completely)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ id, ...chatObject }] = testChats
    const {
      participants: [, userUid],
    } = chatObject
    const chat = new Chat(chatObject)

    await chat.get(userUid)

    expect(chat.id).not.toHaveLength(0)
    expect(chat.participants).toHaveLength(1)

    await chat.deleteForUser(userUid)
    const updatedChat = new Chat({
      id: chat.id,
    })

    await updatedChat.get()

    expect(updatedChat.lastMessage).toHaveLength(0)
    expect(updatedChat.lastMessageBy).toHaveLength(0)
    expect(updatedChat.littenSpecies).toHaveLength(0)
    expect(updatedChat.littenType).toHaveLength(0)
    expect(updatedChat.littenUid).toHaveLength(0)
    expect(updatedChat.participants).toHaveLength(0)
    expect(updatedChat.read).toHaveLength(0)
  })
})

describe('Test the Message model', () => {
  const testMessages = messages.map(mapName('text'))

  it.each(testMessages)(
    'creates the message "%s"',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ id, ...newMessageObject }) => {
      const newMessage = new Message(newMessageObject)
      const res = await newMessage.create()

      expect(res).not.toBeNull()
      expect(newMessage.id).not.toHaveLength(0)
      expect(newMessage.chatUid).not.toHaveLength(0)
      expect(newMessage.text).not.toHaveLength(0)
      expect(newMessage.userUid).not.toHaveLength(0)
      const createdMessage = new Message({
        id: newMessage.id,
      })

      await createdMessage.get()

      expect(createdMessage.id).toBe(newMessage.id)
      expect(createdMessage.chatUid).toBe(newMessageObject.chatUid)
      expect(createdMessage.text).toBe(newMessageObject.text)
      expect(createdMessage.userUid).toBe(newMessageObject.userUid)
    },
  )
})
