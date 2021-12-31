import PushNotification from 'react-native-push-notification'
import { logError } from 'utils/dev'

class NotificationHandler {
  #onNotification
  #onRegister

  onNotification(notification: any) {
    if (typeof this.#onNotification === 'function') {
      this.#onNotification(notification)
    }
  }

  onRegister(token: any) {
    if (typeof this.#onRegister === 'function') {
      this.#onRegister(token)
    }
  }

  onAction(notification: any) {
    if (notification.action === 'Yes') {
      PushNotification.invokeApp(notification)
    }
  }

  onRegistrationError(err: any) {
    logError(err)
  }

  attachRegister(handler: any) {
    this.#onRegister = handler
  }

  attachNotification(handler: any) {
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
