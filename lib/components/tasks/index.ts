import { createContext } from 'react'
import type { Context } from 'react'
import type { BackgroundServiceType } from '@config/background-service'

const TasksContext: Context<BackgroundServiceType> =
  createContext<BackgroundServiceType>(null)

const TasksProvider = TasksContext.Provider

export { TasksContext, TasksProvider }
