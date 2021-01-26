/**
 * @format
 * @flow
 */

import * as RootNavigation from 'config/navigation/root'
import { SCREEN_MESSAGE_PRIVATE } from 'utils/constants'

const useNotificationHandler = (): [(args: any) => void] => {
  const onNotification = ({ foreground, data, userInteraction }) => {
    if (foreground && userInteraction) {
      const { chat, litten, recipient } = data

      if (chat && litten && recipient) {
        RootNavigation.navigate(SCREEN_MESSAGE_PRIVATE, {
          chat,
          recipient,
          litten,
        })
      }
    }
  }

  return [onNotification]
}

export default useNotificationHandler
