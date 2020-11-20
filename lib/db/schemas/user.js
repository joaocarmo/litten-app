/**
 * @format
 * @flow
 */

import User from 'model/user'
import type { BasicUser } from 'model/types/user'

export const userSchema: BasicUser = new User({}).toJSON()
