/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCacheUsers, useFavourites, useUserCoordinates } from 'hooks'
import { Alert } from 'react-native'
import LittenCardComponent from 'components/litten-card/card-component'
import Litten from 'model/litten'
import User from 'model/user'
import { distanceBetween, getFavouriteIndex } from 'utils/functions'
import { translate } from 'utils/i18n'
import { debugLog } from 'utils/dev'

const LittenSmartCard: (args: any) => React$Node = ({
  litten: littenProp,
  editable = false,
  onPressAction = (item) =>
    Alert.alert(translate('feedback.errorMessages.notImplemented')),
}) => {
  const [getUser] = useCacheUsers()
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [distance, setDistance] = useState(0)
  const [isFavourite, setIsFavourite] = useState(false)

  const [authenticatedUserCoordinates] = useUserCoordinates()
  const [favourites] = useFavourites()

  const litten = useRef(
    littenProp instanceof Litten ? littenProp : new Litten(littenProp),
  ).current

  debugLog('LittenSmartCard', litten.id, 'isLoading', isLoading)

  const distanceKM = useMemo(
    () =>
      littenProp.distance ??
      distanceBetween(litten.coordinates, authenticatedUserCoordinates),
    [authenticatedUserCoordinates, litten.coordinates, littenProp.distance],
  )

  const setupFavourite = useCallback(() => {
    setIsFavourite(!(getFavouriteIndex(litten, favourites) < 0))
  }, [favourites, litten])

  const setUp = useCallback(
    async (item) => {
      const userInfo: $FlowFixMe = new User(await getUser(item.userUid))

      setUser(userInfo)
      setDistance(distanceKM)
      setupFavourite()
      setIsLoading(false)
    },
    [distanceKM, getUser, setupFavourite],
  )

  useEffect(() => {
    setUp(litten)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setupFavourite()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites])

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
