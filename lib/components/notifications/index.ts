import { createContext } from 'react'
import type { Context } from 'react'
import type { NotificationService } from '@config/notification-service'

const NotificationsContext: Context<NotificationService> =
  createContext<NotificationService>(null)

const NotificationsProvider = NotificationsContext.Provider

export { NotificationsContext, NotificationsProvider }
