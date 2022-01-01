import { useContext } from 'react'
import { NotificationsContext } from '@components/notifications'

const useNotifications = () => {
  const notifications = useContext(NotificationsContext)

  return notifications
}

export default useNotifications
