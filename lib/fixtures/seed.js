/**
 * @format
 */

const faker = require('faker')

const NUM_RECORDS = 100
const MIN_PHOTOS = 1
const MAX_PHOTOS = 8

const USER_PREFERENCES_CONTACT_INAPP = 'USER_PREFERENCES_CONTACT_INAPP'

const LITTEN_SPECIES_DOG = 'LITTEN_SPECIES_DOG'
const LITTEN_SPECIES_CAT = 'LITTEN_SPECIES_CAT'
const LITTEN_SPECIES_BIRD = 'LITTEN_SPECIES_BIRD'
const LITTEN_SPECIES_RABBIT = 'LITTEN_SPECIES_RABBIT'
const LITTEN_SPECIES_RODENT = 'LITTEN_SPECIES_RODENT'
const LITTEN_SPECIES_OTHER = 'LITTEN_SPECIES_OTHER'
const LITTEN_SPECIES = [
  LITTEN_SPECIES_DOG,
  LITTEN_SPECIES_CAT,
  LITTEN_SPECIES_BIRD,
  LITTEN_SPECIES_RABBIT,
  LITTEN_SPECIES_RODENT,
  LITTEN_SPECIES_OTHER,
]

const LITTEN_TYPE_ADOPT = 'LITTEN_TYPE_ADOPT'
const LITTEN_TYPE_BREED = 'LITTEN_TYPE_BREED'
const LITTEN_TYPE_LOST = 'LITTEN_TYPE_LOST'
const LITTEN_TYPE_FOUND = 'LITTEN_TYPE_FOUND'
const LITTEN_TYPES = [
  LITTEN_TYPE_ADOPT,
  LITTEN_TYPE_BREED,
  LITTEN_TYPE_LOST,
  LITTEN_TYPE_FOUND,
]

const getRandInt = (min, max) => Math.floor(Math.random() * (max - min) + min)

const getLocation = () => ({
  administrativeArea1: faker.address.state(),
  administrativeArea2: faker.address.country(),
  administrativeArea3: '',
  administrativeArea4: '',
  administrativeArea5: faker.address.city(),
  administrativeArea6: '',
  coordinates: {
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
  },
  country: faker.address.countryCode(),
  street: faker.address.streetAddress(),
})

const getPhotos = (min, max, generator) =>
  [...Array(getRandInt(min, max))].map(
    () => `${generator()}?token=${faker.random.uuid()}`,
  )

const getSpecies = () =>
  LITTEN_SPECIES[getRandInt(0, LITTEN_SPECIES.length - 1)]

const getType = () => LITTEN_TYPES[getRandInt(0, LITTEN_TYPES.length - 1)]

const getTags = () => faker.lorem.words().split(' ')

const getObjectFromObjects = (objects) =>
  objects[getRandInt(0, objects.length - 1)]

const authUser = {
  disabled: false,
  displayName: 'Litten Team',
  email: 'team@litten.app',
  emailVerified: true,
  password: 'thisisthepassword',
  phoneNumber: undefined,
  photoURL: undefined,
}

const authUserRecord = {
  contactPreferences: [USER_PREFERENCES_CONTACT_INAPP],
  displayName: authUser.displayName,
  email: authUser.email,
  isOrganization: true,
  location: {
    administrativeArea1: 'Porto',
    administrativeArea2: 'PT',
    administrativeArea3: '',
    administrativeArea4: '',
    administrativeArea5: 'Porto',
    administrativeArea6: '',
    coordinates: {
      latitude: 41.1579,
      longitude: -8.6291,
    },
    country: 'PT',
    street: '',
  },
  phoneNumber: authUser.phoneNumber,
  photoURL: authUser.photoURL,
}

const users = [...Array(NUM_RECORDS)].map(() => ({
  contactPreferences: [USER_PREFERENCES_CONTACT_INAPP],
  displayName: faker.name.findName(),
  email: faker.internet.email(),
  id: faker.random.uuid(),
  isOrganization: faker.random.boolean(),
  location: getLocation(),
  phoneNumber: faker.phone.phoneNumber(),
  photoURL: `${faker.image.people()}?token=${faker.random.uuid()}`,
}))

const littens = [...Array(NUM_RECORDS)].map(() => ({
  active: faker.random.boolean(),
  id: faker.random.uuid(),
  location: getLocation(),
  photos: getPhotos(MIN_PHOTOS, MAX_PHOTOS, faker.image.animals),
  species: getSpecies(),
  story: faker.lorem.paragraphs(),
  tags: getTags(),
  title: faker.name.firstName(),
  type: getType(),
  userUid: getObjectFromObjects(users).id,
}))

const chats = [...Array(NUM_RECORDS)].map(() => {
  const fromLitten = getObjectFromObjects(littens)
  const fromUser = getObjectFromObjects(users)

  return {
    id: faker.random.uuid(),
    lastMessage: faker.lorem.sentence(),
    littenSpecies: fromLitten.species,
    littenType: fromLitten.type,
    littenUid: fromLitten.id,
    participants: [fromLitten.userUid, fromUser.id],
    read: [fromLitten.userUid, fromUser.id],
  }
})

const messages = [...Array(NUM_RECORDS * 10)].map(() => {
  const { id: chatUid, participants } = getObjectFromObjects(chats)
  const fromRandUserId = participants[getRandInt(0, participants.length - 1)]

  return {
    chatUid,
    id: faker.random.uuid(),
    text: faker.lorem.sentence(),
    userUid: fromRandUserId,
  }
})

module.exports = {
  authUser,
  authUserRecord,
  chats,
  littens,
  messages,
  users,
}
