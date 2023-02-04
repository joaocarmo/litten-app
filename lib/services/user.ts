import EntityService from '@services/entity'
import { DB_USER_COLLECTION } from '@utils/constants'
import type { BasicUser } from '@model/types/user'

export default class UserService extends EntityService<BasicUser> {
  static COLLECTION_NAME = DB_USER_COLLECTION
}
