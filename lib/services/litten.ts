import EntityService from '@services/entity'
import { DB_LITTEN_COLLECTION } from '@utils/constants'
import type { BasicLitten } from '@model/types/litten'

export default class LittenService extends EntityService<BasicLitten> {
  static COLLECTION_NAME = DB_LITTEN_COLLECTION
}
