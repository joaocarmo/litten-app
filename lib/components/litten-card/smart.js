/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  useCacheLittens,
  useCacheUsers,
  useFavourites,
  useUserCoordinates,
} from 'hooks'
import { Alert } from 'react-native'
import LittenCardComponent from 'components/litten-card/card-component'
import { HeartFill, HeartOutline } from 'images/components/icons'
import Litten from 'model/litten'
import User from 'model/user'
import { distanceBetween, getFavouriteIndex } from 'utils/functions'
import { memoizedGetFromModel as getFromModel } from 'utils/network'
import { translate } from 'utils/i18n'
import { debugLog } from 'utils/dev'

const LittenSmartCard: (args: any) => React$Node = ({
  litten: littenProp,
  editable = false,
  handleOnPressAction = (item) =>
    Alert.alert(translate('feedback.errorMessages.notImplemented')),
}) => {
  const [littens, addLitten] = useCacheLittens()
  const [users, addUser] = useCacheUsers()
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

  const FavIconComponent = useMemo(
    () => (isFavourite ? HeartFill : HeartOutline),
    [isFavourite],
  )

  const setupFavourite = useCallback(() => {
    setIsFavourite(!(getFavouriteIndex(litten, favourites) < 0))
  }, [favourites, litten])

  const getUser = useCallback(
    async (id) => {
      let userInfo = users[id]

      if (!userInfo) {
        const newUser = await getFromModel(User, id)
        userInfo = newUser.toJSON()
        addUser(userInfo)
      } else {
        userInfo = new User(userInfo)
      }

      return userInfo
    },
    [addUser, users],
  )

  const setUp = useCallback(
    async (item) => {
      const userInfo = await getUser(item.userUid)

      if (!littens[item.id]) {
        const newLitten = item.toJSON()
        addLitten(newLitten)
      }

      setUser(userInfo)
      setDistance(distanceKM)
      setupFavourite()
      setIsLoading(false)
    },
    [addLitten, distanceKM, getUser, littens, setupFavourite],
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
      FavIconComponent={FavIconComponent}
      handleOnPressAction={handleOnPressAction}
      litten={litten}
      user={user}
    />
  )
}

export default LittenSmartCard
