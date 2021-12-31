import { createContext } from 'react'

const TasksContext: React.Context<any> = createContext<any>(null)

const TasksProvider = TasksContext.Provider

export { TasksContext, TasksProvider }
