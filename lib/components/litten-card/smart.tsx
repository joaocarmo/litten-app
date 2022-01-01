import Toast from 'react-native-simple-toast'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useCacheUsers, useFavourite, useUserCoordinates } from '@hooks'
import LittenCardComponent from '@components/litten-card/card-component'
import Litten from '@model/litten'
import { distanceBetween } from '@utils/functions'
import { translate } from '@utils/i18n'
import { debugLog } from '@utils/dev'

const LittenSmartCard = ({
  litten: littenProp,
  editable = false,
  onPressAction = (item) =>
    Toast.show(translate('feedback.errorMessages.notImplemented')),
}) => {
  const [getUser] = useCacheUsers()
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [distance, setDistance] = useState(0)
  const litten = useRef(
    littenProp instanceof Litten ? littenProp : new Litten(littenProp),
  ).current
  const [isFavourite] = useFavourite(litten)
  const [authenticatedUserCoordinates] = useUserCoordinates()
  const distanceKM = useMemo(
    () =>
      littenProp.distance ??
      distanceBetween(litten.coordinates, authenticatedUserCoordinates),
    [authenticatedUserCoordinates, litten.coordinates, littenProp.distance],
  )
  debugLog('LittenSmartCard', litten.id, 'isLoading', isLoading)
  const setUp = useCallback(
    async (item) => {
      const userInfo = await getUser(item.userUid)
      setUser(userInfo)
      setDistance(distanceKM)
      setIsLoading(false)
    },
    [distanceKM, getUser],
  )
  useEffect(() => {
    setUp(litten)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <LittenCardComponent
      distance={distance}
      editable={editable}
      isFavourite={isFavourite}
      litten={litten}
      onPressAction={onPressAction}
      user={user}
    />
  )
}

export default LittenSmartCard
