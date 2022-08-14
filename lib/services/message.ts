import EntityService from '@services/entity'
import { DB_MESSAGE_COLLECTION } from '@utils/constants'
import type { BasicMessage } from '@model/types/message'

export default class LittenService extends EntityService<BasicMessage> {
  static COLLECTION_NAME = DB_MESSAGE_COLLECTION
}
