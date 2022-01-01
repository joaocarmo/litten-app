import { useCallback, useContext, useEffect } from 'react'
import { TasksContext } from '@components/tasks'
import useTasksHandler from '@hooks/use-tasks-handler'
import { debugLog } from '@utils/dev'

const useTasks = () => {
  const tasks = useContext(TasksContext)

  const [onBackgroundFetch, onBackgroundFail, onBackgroundTimeout] =
    useTasksHandler()

  const headlessTask = useCallback(
    ({ taskId, timeout }) => {
      if (timeout) {
        debugLog('[BACKGROUND SERVICE] headless timeout')
        return onBackgroundTimeout(taskId)
      }

      debugLog('[BACKGROUND SERVICE] headless start')
      return onBackgroundFetch(taskId)
    },
    [onBackgroundFetch, onBackgroundTimeout],
  )

  useEffect(() => {
    tasks.registerOnBackgroundFetch(onBackgroundFetch)
    tasks.registerOnBackgroundFail(onBackgroundFail)
    tasks.registerOnBackgroundTimeout(onBackgroundTimeout)
    tasks.registerHeadlessTask(headlessTask)
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
