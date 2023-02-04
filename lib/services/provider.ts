import AuthService from '@services/auth'
import ChatService from '@services/chat'
import LittenService from '@services/litten'
import MessageService from '@services/message'
import UserService from '@services/user'

export default class ServicesProvider {
  auth: AuthService

  chat: ChatService

  litten: LittenService

  message: MessageService

  user: UserService

  constructor() {
    this.auth = new AuthService()
    this.chat = new ChatService()
    this.litten = new LittenService()
    this.message = new MessageService()
    this.user = new UserService()
  }
}
