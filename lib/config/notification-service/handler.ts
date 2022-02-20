/* eslint-disable class-methods-use-this */
import PushNotification from 'react-native-push-notification'
import { logError } from '@utils/dev'

class NotificationHandler {
  #onNotification

  #onRegister

  onNotification(notification) {
    if (typeof this.#onNotification === 'function') {
      this.#onNotification(notification)
    }
  }

  onRegister(token) {
    if (typeof this.#onRegister === 'function') {
      this.#onRegister(token)
    }
  }

  onAction(notification) {
    if (notification.action === 'Yes') {
      PushNotification.invokeApp(notification)
    }
  }

  onRegistrationError(err) {
    logError(err)
  }

  attachRegister(handler) {
    this.#onRegister = handler
  }

  attachNotification(handler) {
    this.#onNotification = handler
  }
}

const handler: NotificationHandler = new NotificationHandler()

PushNotification.configure({
  onRegister: handler.onRegister.bind(handler),
  onNotification: handler.onNotification.bind(handler),
  onAction: handler.onAction.bind(handler),
  onRegistrationError: handler.onRegistrationError.bind(handler),
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
})

export default handler
