import EntityService from '@services/entity'
import { DB_CHAT_COLLECTION } from '@utils/constants'
import type { BasicChat } from '@model/types/chat'

export default class LittenService extends EntityService<BasicChat> {
  static COLLECTION_NAME = DB_CHAT_COLLECTION
}
