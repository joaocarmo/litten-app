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

  const [
    onBackgroundFetch,
    onBackgroundFail,
    onBackgroundTimeout,
  ] = useTasksHandler()

  useEffect(() => {
    tasks.registerOnBackgroundFetch(onBackgroundFetch)
    tasks.registerOnBackgroundFail(onBackgroundFail)
    tasks.registerOnBackgroundTimeout(onBackgroundTimeout)
    tasks.configure()

    debugLog('[BACKGROUND SERVICE] start')
    return () => {
      tasks.stop()

      debugLog('[BACKGROUND SERVICE] stop')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return tasks
}

export default useTasks
