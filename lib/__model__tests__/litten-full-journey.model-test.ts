import Chat from '@model/chat'
import Litten from '@model/litten'
import Message from '@model/message'
import Search from '@model/search'
import User from '@model/user'
import { littens, messages, users } from '@fixtures/tests'
import { cleanFirestore } from './utils'

describe('Performs an end-to-end user and litten journey', () => {
  beforeAll(async () => {
    await cleanFirestore()
  })

  it(`creates ${users.length} new users`, async () => {
    const usersCollection = await User.collection.get()
    expect(usersCollection.size).toBe(0)

    for await (const user of users) {
      const newUser = new User(user)
      await newUser.create()
    }

    const newUsersCollection = await User.collection.get()
    expect(newUsersCollection.size).toBe(users.length)
  })

  it(`user creates ${littens.length} new littens`, async () => {
    const userResults = await User.collection.limit(1).get()
    const [firstUser] = userResults.docs
    const userUid = firstUser.id
    const littensCollection = await Litten.collection.get()
    expect(littensCollection.size).toBe(0)

    const littensToCreate = littens.map((litten) => {
      const newLitten = new Litten({
        ...litten,
        userUid,
      })
      return newLitten.create()
    })

    await Promise.all(littensToCreate)

    const newLittensCollection = await Litten.collection.get()
    expect(newLittensCollection.size).toBe(littens.length)
  })

  it('user archives one litten', async () => {
    const userResults = await User.collection.limit(1).get()
    const [firstUser] = userResults.docs
    const userUid = firstUser.id
    const search = new Search({
      user: {
        id: userUid,
      },
    })
    const activeLittens = await search.userActivePosts()
    expect(activeLittens).toHaveLength(littens.length)
    const [firstActiveLitten] = activeLittens
    expect(firstActiveLitten.active).toBe(true)
    const litten = new Litten(firstActiveLitten)
    await litten.archive()
    const inactiveLittens = await search.userInactivePosts()
    expect(inactiveLittens).toHaveLength(littens.length - 1)
    const [firstInactiveLitten] = inactiveLittens
    expect(firstInactiveLitten.id).toBe(firstActiveLitten.id)
    expect(firstInactiveLitten.active).toBe(false)
  })

  it('user browses feed', async () => {
    const search = new Search({
      query: undefined,
      filters: undefined,
      user: undefined,
    })
    const feed = await search.getHomeFeed()
    expect(feed).toHaveLength(1)
    const [firstLitten] = feed
    expect(firstLitten.id).not.toHaveLength(0)
    expect(firstLitten.active).toBe(true)
    expect(firstLitten.species).not.toHaveLength(0)
    expect(firstLitten.story).not.toHaveLength(0)
    expect(firstLitten.story).not.toHaveLength(0)
    expect(firstLitten.title).not.toHaveLength(0)
    expect(firstLitten.type).not.toHaveLength(0)
    expect(firstLitten.userUid).not.toHaveLength(0)
    const littenOwner = new User({
      id: firstLitten.userUid,
    })
    await littenOwner.get()
    expect(littenOwner.displayName).not.toHaveLength(0)
    expect(Object.keys(littenOwner.contactPreferences)).not.toHaveLength(0)
  })

  it('user messages the litten owner', async () => {
    const [{ text }] = messages
    const chatsCollection = await Chat.collection.get()
    expect(chatsCollection.size).toBe(0)
    const search = new Search({
      query: undefined,
      filters: undefined,
      user: undefined,
    })
    const feed = await search.getHomeFeed()
    const [
      { id: littenUid, species: littenSpecies, type: littenType, userUid },
    ] = feed
    const littenOwner = new User({
      id: userUid,
    })
    const participants = [
      littenOwner.id,
      users.find(({ id }) => id !== littenOwner.id).id,
    ]
    const newChat = new Chat({
      littenSpecies,
      littenType,
      littenUid,
      participants,
    })
    await newChat.create()
    const newChatsCollection = await Chat.collection.get()
    expect(newChatsCollection.size).toBe(1)
    const messagesCollection = await Message.collection.get()
    expect(messagesCollection.size).toBe(0)
    const newMessage = new Message({
      chatUid: newChat.id,
      text,
      userUid,
    })
    await newMessage.create()
    expect(newChat.read).toHaveLength(0)
    await newChat.setLastMessage({
      lastMessage: text,
      lastMessageBy: userUid,
    })
    const newMessagesCollection = await Message.collection.get()
    expect(newMessagesCollection.size).toBe(1)
    const chatMessages = await newMessage.subscribeToChat().get()
    expect(chatMessages.size).toBe(1)
    const [newChatMessage] = chatMessages.docs
    const newChatMessageData = {
      ...newChatMessage.data(),
      id: newChatMessage.id,
    }
    expect(new Message(newChatMessageData).toJSON()).toEqual(
      expect.objectContaining({
        ...newMessage.toJSON(),
        metadata: expect.any(Object),
      }),
    )
    await newChat.get()
    expect(newChat.read).toHaveLength(1)
    expect(newChat.read).toContain(userUid)
    expect(newChat.lastMessage).toBe(text)
    expect(newChat.lastMessageBy).toBe(userUid)
  })

  it('litten owner receives a new message', async () => {
    const [{ text }] = messages
    const chatResults = await Chat.collection.limit(1).get()
    const [firstChatDoc] = chatResults.docs
    const firstChat = firstChatDoc.data()
    const chatUid = firstChatDoc.id
    const message = new Message({
      chatUid,
    })
    const chatMessages = await message.subscribeToChat().get()
    expect(chatMessages.size).toBe(1)
    const [chatMessageDoc] = chatMessages.docs
    const chatMessage = chatMessageDoc.data()
    expect(chatMessage.text).toBe(text)
    const userUid = users.find(({ id }) => id !== chatMessage.userUid).id
    const chat = new Chat(firstChat)
    expect(chat.lastMessage).toBe(text)
    expect(chat.read).toHaveLength(1)
    expect(chat.read).not.toContain(userUid)
    await chat.setReadBy(userUid)
    await chat.get()
    expect(chat.read).toHaveLength(2)
    expect(chat.read).toContain(userUid)
  })

  /**
   * This is a crucial test! We need to ensure we completely delete all data
   * beloging to users that wish to remove their account in compliance with all
   * applicable laws (e.g., Europe's GDPR).
   */
  it('user deletes the profile', async () => {
    // We start by finding a user that has littens
    const littensCollection = await Litten.collection.limit(1).get()

    expect(littensCollection.size > 0).toBe(true)

    const [littenDoc] = littensCollection.docs
    const { userUid } = littenDoc.data()

    expect(userUid.length > 0).toBe(true)

    // We verify all the chats, littens and messages the user has
    const dbUser = await User.collection.doc(userUid).get()
    const userChats = await Chat.collection
      .where('participants', 'array-contains', userUid)
      .get()
    const userLittens = await Litten.collection
      .where('userUid', '==', userUid)
      .get()
    const userMessages = await Message.collection
      .where('userUid', '==', userUid)
      .get()

    expect(dbUser.exists).toBe(true)
    expect(userChats.size > 0).toBe(true)
    expect(userLittens.size > 0).toBe(true)
    expect(userMessages.size > 0).toBe(true)

    // We proceed to delete the user information
    const user = new User({
      id: userUid,
    })

    await user.delete()

    // Finally, we make sure everything was removed
    const deletedDBUser = await User.collection.doc(userUid).get()
    const deletedUserChats = await Chat.collection
      .where('participants', 'array-contains', userUid)
      .get()
    const deletedUserLittens = await Litten.collection
      .where('userUid', '==', userUid)
      .get()
    const deletedUserMessages = await Message.collection
      .where('userUid', '==', userUid)
      .get()

    expect(deletedDBUser.exists).toBe(false)
    expect(deletedUserChats.size).toBe(0)
    expect(deletedUserLittens.size).toBe(0)
    expect(deletedUserMessages.size).toBe(0)
  })
})
