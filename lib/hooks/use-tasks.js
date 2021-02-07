/**
 * @format
 * @flow
 */

import { useContext, useEffect } from 'react'
import { TasksContext } from 'components/tasks'
import useTasksHandler from 'hooks/use-tasks-handler'
import { debugLog } from 'utils/dev'

const useTasks = (): any => {
  const tasks = useContext(TasksContext)

  const [onBackgroundFetch, onBackgroundFail] = useTasksHandler()

  useEffect(() => {
    tasks.registerOnBackgroundFetch(onBackgroundFetch)
    tasks.registerOnBackgroundFail(onBackgroundFail)
    tasks.configure()

    debugLog('[BACKGROUND SERVICE] start')
    return () => {
      tasks.stop()

      debugLog('[BACKGROUND SERVICE] stop')
    }
  }, [onBackgroundFail, onBackgroundFetch, tasks])

  return tasks
}

export default useTasks
