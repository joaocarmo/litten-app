/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import * as RootNavigation from 'config/navigation/root'
import { SCREEN_MESSAGE_PRIVATE } from 'utils/constants'
import { debugLog } from 'utils/dev'

const useNotificationHandler = (): [
  (args: any) => void,
  (token: string) => void,
] => {
  const onNotification = useCallback(
    ({ foreground, data: { screen, ...data }, userInteraction }) => {
      if (screen) {
        RootNavigation.navigate(screen)
      } else if (foreground && userInteraction) {
        const { chat, litten, recipient } = data

        if (chat && litten && recipient) {
          RootNavigation.navigate(SCREEN_MESSAGE_PRIVATE, {
            chat,
            recipient,
            litten,
          })
        }
      }
    },
    [],
  )

  const onRegister = useCallback((token) => {
    debugLog('[onRegister] Token', token)
  }, [])

  return [onNotification, onRegister]
}

export default useNotificationHandler
