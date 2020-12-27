/**
 * @format
 * @flow
 */

import { locationSchema } from 'db/schemas/location'
import { LITTEN_SPECIES_CAT, LITTEN_TYPE_ADOPT } from 'utils/constants'

export const messageText1 = 'Have you come here for forgiveness?'

export const messageText2 = 'Have you come to raise the dead?'

export const users = [
  {
    id: 'superFakeUserId1',
    displayName: 'Luke Skywalker',
    email: 'luke@litten.app',
    phoneNumber: '+12025550143',
    photoURL: 'https://i.pravatar.cc/400',
    location: {
      ...locationSchema,
      country: 'US',
    },
  },
  {
    id: 'superFakeUserId2',
    displayName: 'Leia Organa',
    email: 'leia@litten.app',
    phoneNumber: '+12025550143',
    photoURL: 'https://i.pravatar.cc/400',
    location: {
      ...locationSchema,
      country: 'US',
    },
  },
]

export const littens = [
  {
    active: true,
    id: 'superFakeLittenId1',
    location: {
      ...locationSchema,
      country: 'US',
    },
    photos: ['https://loremflickr.com/1000/1000/kitten'],
    species: LITTEN_SPECIES_CAT,
    story: 'Hello there !',
    title: 'Obi-Wan Kenobi',
    type: LITTEN_TYPE_ADOPT,
    userUid: users[0].id,
    tags: ['obi', 'wan', 'kenobi'],
  },
  {
    active: true,
    id: 'superFakeLittenId2',
    location: {
      ...locationSchema,
      country: 'US',
    },
    photos: ['https://loremflickr.com/1000/1000/kitten'],
    species: LITTEN_SPECIES_CAT,
    story: 'General Kenobi !',
    title: 'General Grievous',
    type: LITTEN_TYPE_ADOPT,
    userUid: users[1].id,
    tags: ['general', 'grievous'],
  },
]

export const chats = [
  {
    id: 'superFakeChatId1',
    lastMessage: messageText1,
    littenSpecies: LITTEN_SPECIES_CAT,
    littenType: LITTEN_TYPE_ADOPT,
    littenUid: littens[0].id,
    participants: [users[0].id, users[0].id],
    read: [users[0].id, users[0].id],
  },
  {
    id: 'superFakeChatId2',
    lastMessage: messageText2,
    littenSpecies: LITTEN_SPECIES_CAT,
    littenType: LITTEN_TYPE_ADOPT,
    littenUid: littens[1].id,
    participants: [users[0].id, users[0].id],
    read: [users[0].id, users[0].id],
  },
]

export const messages = [
  {
    id: 'superFakeMessageId1',
    chatUid: chats[0].id,
    text: messageText1,
    userUid: littens[0].id,
  },
  {
    id: 'superFakeMessageId2',
    chatUid: chats[1].id,
    text: messageText2,
    userUid: littens[1].id,
  },
]
