import { createContext } from 'react'

const NotificationsContext: React.Context<any> = createContext<any>(null)

const NotificationsProvider = NotificationsContext.Provider

export { NotificationsContext, NotificationsProvider }
