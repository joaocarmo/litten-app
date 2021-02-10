/**
 * @format
 * @flow
 */

import { useCallback, useContext } from 'react'
import { TasksContext } from 'components/tasks'
import useAppNotifications from 'hooks/use-app-notifications'
import useNotifications from 'hooks/use-notifications'
import useUserUid from 'hooks/use-useruid'
import Chat from 'model/chat'
import { SCREEN_TAB_NAV_MESSAGES } from 'utils/constants'
import { debugLog } from 'utils/dev'
import { translate } from 'utils/i18n'

const useTasksHandler = (): [
  (taskId: string) => Promise<void>,
  (status: number) => void,
] => {
  const tasks = useContext(TasksContext)
  const notifications = useNotifications()
  const [appNotifications, setAppNotifications] = useAppNotifications()
  const userUid = useUserUid()

  const onBackgroundFetch = useCallback(
    async (taskId) => {
      debugLog('[BackgroundFetch] task started', taskId)

      let { lastCheckAt, unreadChatsNum } = appNotifications
      let newUnreadChats = 0

      if (!lastCheckAt) {
        unreadChatsNum = 0
      } else {
        newUnreadChats = await Chat.getLastUnreadChats(
          userUid,
          new Date(lastCheckAt),
        )
        console.log('newUnreadChats', newUnreadChats)
      }

      lastCheckAt = new Date().valueOf()

      unreadChatsNum += newUnreadChats

      if (newUnreadChats > 0) {
        notifications.localNotification(
          translate('feedback.system.newMessagesTitle'),
          translate('feedback.system.newMessagesText', { unreadChatsNum }),
          { userInfo: { screen: SCREEN_TAB_NAV_MESSAGES } },
        )
      }

      setAppNotifications({
        lastCheckAt,
        unreadChatsNum,
      })

      tasks.finish(taskId)
    },
    [appNotifications, notifications, setAppNotifications, tasks, userUid],
  )

  const onBackgroundFail = useCallback((error) => {
    debugLog('[BackgroundFetch] failed to start', error)
  }, [])

  return [onBackgroundFetch, onBackgroundFail]
}

export default useTasksHandler
