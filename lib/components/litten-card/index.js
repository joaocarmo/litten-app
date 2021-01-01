/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useCache, useFavourites, useUnit, useUserCoordinates } from 'hooks'
import { Alert } from 'react-native'
import LittenCardComponent from 'components/litten-card/card-component'
import { HeartFill, HeartOutline } from 'images/components/icons'
import Litten from 'model/litten'
import User from 'model/user'
import { SCREEN_LITTEN_POST } from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'
import {
  convertLength,
  distanceBetween,
  getFavouriteIndex,
  getFromListByKey,
} from 'utils/functions'
import { memoizedGetFromModel as getFromModel } from 'utils/network'
import I18n, { translate } from 'utils/i18n'
import { debugLog } from 'utils/dev'

const LittenCard: (args: any) => React$Node = ({
  litten: { distance: littenDistance, ...littenProp },
  editable = false,
  handleOnPressAction = (item) =>
    Alert.alert(translate('feedback.errorMessages.notImplemented')),
}) => {
  const [littens, addLitten] = useCache('littens')
  const [users, addUser] = useCache('users')
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [species, setSpecies] = useState({})
  const [type, setType] = useState({})
  const [distance, setDistance] = useState(0)
  const [isFavourite, setIsFavourite] = useState(false)

  const authenticatedUserCoordinates = useUserCoordinates()
  const [favourites] = useFavourites()
  const [unit, useMetricUnits] = useUnit('length')

  const litten = useRef(
    littenProp instanceof Litten ? littenProp : new Litten(littenProp),
  ).current

  debugLog('LittenCard', litten.id, 'isLoading', isLoading)

  const distanceLocalized = useMemo(
    () =>
      I18n.toNumber(distance, {
        strip_insignificant_zeros: true,
      }),
    [distance],
  )
  const distanceKM = useMemo(
    () =>
      littenDistance ??
      distanceBetween(litten.coordinates, authenticatedUserCoordinates),
    [authenticatedUserCoordinates, litten.coordinates, littenDistance],
  )
  const distanceRaw = useMemo(() => convertLength(distanceKM, useMetricUnits), [
    distanceKM,
    useMetricUnits,
  ])
  const FavIconComponent = useMemo(
    () => (isFavourite ? HeartFill : HeartOutline),
    [isFavourite],
  )

  const navigation = useNavigation()

  const setupFavourite = useCallback(() => {
    setIsFavourite(!(getFavouriteIndex(litten, favourites) < 0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites])

  const setUp = useCallback(async () => {
    const userUid = litten.userUid
    let userInfo = users[userUid]

    if (!userInfo) {
      const newUser = await getFromModel(User, userUid)
      addUser(newUser.toJSON())
    } else {
      userInfo = new User(userInfo)
    }

    if (!littens[litten.id]) {
      const newLitten = litten.toJSON()
      addLitten(newLitten)
    }

    const speciesObject =
      getFromListByKey(littenSpeciesList, litten.species) ?? {}
    const typeObject = getFromListByKey(littenTypes, litten.type) ?? {}

    setUser(userInfo)
    setSpecies(speciesObject)
    setType(typeObject)
    setDistance(distanceRaw)
    setupFavourite()
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setUp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setupFavourite()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites])

  const handleOnPressLitten = useCallback(() => {
    navigation.navigate(SCREEN_LITTEN_POST, { litten, user })
  }, [litten, navigation, user])

  const SpeciesIconComponent = useMemo(() => species?.icon, [species?.icon])
  const TypeIconComponent = useMemo(() => type?.icon, [type?.icon])

  if (isLoading) {
    return null
  }

  return (
    <LittenCardComponent
      distance={distance}
      distanceLocalized={distanceLocalized}
      editable={editable}
      FavIconComponent={FavIconComponent}
      handleOnPressAction={() => handleOnPressAction(litten)}
      handleOnPressLitten={handleOnPressLitten}
      litten={litten}
      SpeciesIconComponent={SpeciesIconComponent}
      type={type}
      TypeIconComponent={TypeIconComponent}
      unit={unit}
      user={user}
    />
  )
}

export default LittenCard
