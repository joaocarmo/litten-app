import User from '@model/user'
import { locationSchema } from '@db/schemas/location'
import type { BasicUser } from '@model/types/user'

const user: BasicUser = new User({}).toJSON()
export const userSchema = { ...user, location: locationSchema }
