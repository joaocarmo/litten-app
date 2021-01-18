/**
 * @format
 * @flow
 */

import { createContext } from 'react'

const NotificationsContext = createContext<any>(null)

const NotificationsProvider = NotificationsContext.Provider

export { NotificationsContext, NotificationsProvider }
