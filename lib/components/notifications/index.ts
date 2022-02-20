import { createContext } from 'react'
import type { Context } from 'react'
import type { NotificationServiceType } from '@config/notification-service'

const NotificationsContext: Context<NotificationServiceType> =
  createContext<NotificationServiceType>(null)

const NotificationsProvider = NotificationsContext.Provider

export { NotificationsContext, NotificationsProvider }
