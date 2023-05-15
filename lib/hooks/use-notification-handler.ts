import { useCallback } from 'react'
import * as RootNavigation from '@config/navigation/root'
import { Routes } from '@utils/constants'

const useNotificationHandler = () => {
  const onNotification = useCallback(
    ({ foreground, data: { screen, ...data }, userInteraction }) => {
      if (screen) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore FIXME
        RootNavigation.navigate(screen)
      } else if (foreground && userInteraction) {
        const { chat, litten, recipient } = data

        if (chat && litten && recipient) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore FIXME
          RootNavigation.navigate(Routes.SCREEN_MESSAGE_PRIVATE, {
            chat,
            recipient,
            litten,
          })
        }
      }
    },
    [],
  )

  return [onNotification]
}

export default useNotificationHandler
