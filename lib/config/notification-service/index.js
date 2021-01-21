/**
 * @format
 * @flow
 */

import PushNotification from 'react-native-push-notification'
import NotificationHandler from 'config/notification-service/handler'
import channels from 'config/notification-service/channels'
import {
  CHANNELS_GENERAL_MESSAGES_ID,
  CHANNELS_PRIVATE_MESSAGES_ID,
} from 'utils/constants'

class NotificationService {
  #lastId
  #doneMessageIds = []

  constructor(onNotification: any, onRegister: any) {
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
    { channelId = CHANNELS_GENERAL_MESSAGES_ID, ...options }: any = {},
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
    { id = '' }: { id: string } = {},
  ) {
    const messageId = id || `${title}${message}`.trim()

    if (!this.#doneMessageIds.includes(messageId)) {
      this.localNotification(title, message, {
        channelId: CHANNELS_PRIVATE_MESSAGES_ID,
      })

      this.#doneMessageIds.push(messageId)
    }
  }

  setApplicationIconBadgeNumber(number: number) {
    PushNotification.setApplicationIconBadgeNumber(number)
  }

  checkPermission(
    callback: (permissions: {
      alert: Boolean,
      badge: boolean,
      sounds: boolean,
    }) => void,
  ): void {
    return PushNotification.checkPermissions(callback)
  }

  requestPermissions() {
    return PushNotification.requestPermissions()
  }
}

export default NotificationService
