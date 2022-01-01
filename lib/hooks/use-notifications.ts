import { useContext } from 'react'
import { NotificationsContext } from '@components/notifications'

const useNotifications = (): any => {
  const notifications = useContext(NotificationsContext)
  return notifications
}

export default useNotifications
