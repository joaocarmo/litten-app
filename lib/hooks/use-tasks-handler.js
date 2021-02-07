/**
 * @format
 * @flow
 */

import { useCallback, useContext } from 'react'
import { TasksContext } from 'components/tasks'
import useNotifications from 'hooks/use-notifications'
import { SCREEN_TAB_NAV_MESSAGES } from 'utils/constants'
import { debugLog } from 'utils/dev'
import { translate } from 'utils/i18n'

const useTasksHandler = (): [
  (taskId: string) => void,
  (status: number) => void,
] => {
  const tasks = useContext(TasksContext)

  const notifications = useNotifications()

  const onBackgroundFetch = useCallback(
    (taskId) => {
      debugLog('[BackgroundFetch] task started', taskId)

      notifications.localNotification(
        translate('feedback.system.newMessagesTitle'),
        translate('feedback.system.newMessagesText'),
        { userInfo: { screen: SCREEN_TAB_NAV_MESSAGES } },
      )

      tasks.finish(taskId)
    },
    [notifications, tasks],
  )

  const onBackgroundFail = useCallback((error) => {
    debugLog('[BackgroundFetch] failed to start', error)
  }, [])

  return [onBackgroundFetch, onBackgroundFail]
}

export default useTasksHandler
