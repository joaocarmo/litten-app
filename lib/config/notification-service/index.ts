/* eslint-disable class-methods-use-this */
import PushNotification from 'react-native-push-notification'
import NotificationHandler from '@config/notification-service/handler'
import channels from '@config/notification-service/channels'
import {
  CHANNELS_GENERAL_MESSAGES_ID,
  CHANNELS_PRIVATE_MESSAGES_ID,
} from '@utils/constants'

class NotificationService {
  #lastId

  #doneMessageIds = []

  constructor(onNotification, onRegister) {
    this.#lastId = 0
    this.createDefaultChannels()
    NotificationHandler.attachRegister(onRegister)
    NotificationHandler.attachNotification(onNotification)

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber((number) => {
      if (number > 0) {
        this.setApplicationIconBadgeNumber(0)
      }
    })
  }

  createDefaultChannels() {
    for (const channel of channels) {
      PushNotification.createChannel(...channel)
    }
  }

  localNotification(
    title: string,
    message: string,
    { channelId = CHANNELS_GENERAL_MESSAGES_ID, ...options } = {},
  ) {
    this.#lastId += 1
    PushNotification.localNotification({
      id: this.#lastId,
      title,
      message,
      channelId,
      ...options,
    })
  }

  messageNotification(
    title: string,
    message: string,
    {
      dry = false,
      id = '',
      userInfo = {},
    }: {
      dry: boolean
      id: string
      userInfo: Record<string, unknown>
    } = {},
  ) {
    const messageId = id || `${title}${message}`.trim()

    if (!this.#doneMessageIds.includes(messageId)) {
      if (!dry) {
        this.localNotification(title, message, {
          channelId: CHANNELS_PRIVATE_MESSAGES_ID,
          userInfo,
        })
      }

      this.#doneMessageIds.push(messageId)
    }
  }

  setApplicationIconBadgeNumber(number: number) {
    PushNotification.setApplicationIconBadgeNumber(number)
  }

  checkPermission(
    callback: (permissions: {
      alert: boolean
      badge: boolean
      sounds: boolean
    }) => void,
  ): void {
    return PushNotification.checkPermissions(callback)
  }

  requestPermissions() {
    return PushNotification.requestPermissions()
  }
}

export default NotificationService

export type NotificationServiceType = typeof NotificationService
