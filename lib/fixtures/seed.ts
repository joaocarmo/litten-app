import faker from '@withshepherd/faker'
import {
  DEFAULT_CONTACT_PREFERENCES,
  LITTEN_SPECIES_BIRD,
  LITTEN_SPECIES_CAT,
  LITTEN_SPECIES_DOG,
  LITTEN_SPECIES_OTHER,
  LITTEN_SPECIES_RABBIT,
  LITTEN_SPECIES_RODENT,
  LITTEN_TYPE_ADOPT,
  LITTEN_TYPE_FOUND,
  LITTEN_TYPE_LOST,
} from '../utils/constants/app'

const NUM_RECORDS = 100
const MIN_PHOTOS = 1
const MAX_PHOTOS = 8

const LITTEN_SPECIES = [
  LITTEN_SPECIES_DOG,
  LITTEN_SPECIES_CAT,
  LITTEN_SPECIES_BIRD,
  LITTEN_SPECIES_RABBIT,
  LITTEN_SPECIES_RODENT,
  LITTEN_SPECIES_OTHER,
]
const LITTEN_TYPES = [LITTEN_TYPE_ADOPT, LITTEN_TYPE_LOST, LITTEN_TYPE_FOUND]

const getRandInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min)

const getUid = () => faker.datatype.uuid()

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

const getPhotos = (min: number, max: number, generator: () => string) =>
  [...Array(getRandInt(min, max))].map(() => `${generator()}?token=${getUid()}`)

const getSpecies = () =>
  LITTEN_SPECIES[getRandInt(0, LITTEN_SPECIES.length - 1)]

const getType = () => LITTEN_TYPES[getRandInt(0, LITTEN_TYPES.length - 1)]

const getTags = () => faker.lorem.words().split(' ')

const getObjectFromObjects = <T>(objects: T[]): T =>
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
  contactPreferences: DEFAULT_CONTACT_PREFERENCES,
  displayName: authUser.displayName,
  email: authUser.email,
  isOrganization: true,
  location: {
    administrativeArea1: 'Porto',
    administrativeArea2: '',
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
  contactPreferences: DEFAULT_CONTACT_PREFERENCES,
  displayName: faker.name.findName(),
  email: faker.internet.email(),
  id: getUid(),
  isOrganization: faker.datatype.boolean(),
  location: getLocation(),
  phoneNumber: faker.phone.phoneNumber(),
  photoURL: `${faker.image.people()}?token=${getUid()}`,
}))

const littens = [...Array(NUM_RECORDS)].map(() => ({
  active: faker.datatype.boolean(),
  id: getUid(),
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
  const participants = [fromLitten.userUid, fromUser.id]
  const lastMessageBy = participants[getRandInt(0, participants.length - 1)]

  return {
    id: getUid(),
    lastMessage: faker.lorem.sentence(),
    lastMessageBy,
    littenSpecies: fromLitten.species,
    littenType: fromLitten.type,
    littenUid: fromLitten.id,
    participants,
    read: [fromLitten.userUid, fromUser.id],
  }
})

const messages = [...Array(NUM_RECORDS * 10)].map(() => {
  const { id: chatUid, participants } = getObjectFromObjects(chats)
  const fromRandUserId = participants[getRandInt(0, participants.length - 1)]

  return {
    chatUid,
    id: getUid(),
    text: faker.lorem.sentence(),
    userUid: fromRandUserId,
  }
})

export { authUser, authUserRecord, chats, littens, messages, users }
