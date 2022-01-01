import { createContext } from 'react'
import type { Context } from 'react'
import type { BackgroundService } from '@config/background-service'

const TasksContext: Context<BackgroundService> =
  createContext<BackgroundService>(null)

const TasksProvider = TasksContext.Provider

export { TasksContext, TasksProvider }
