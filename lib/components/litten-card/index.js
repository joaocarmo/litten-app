/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useCache, useUserCoordinates } from 'hooks'
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
  getUnit,
} from 'utils/functions'
import { memoizedGetFromModel as getFromModel } from 'utils/network'
import I18n, { translate } from 'utils/i18n'

const LittenCard: (args: any) => React$Node = ({
  litten: { distance: littenDistance, ...littenProp },
  editable = false,
  authenticatedUser: {
    preferences: { useMetricUnits },
    saved: { favourites },
  },
  searchSettings,
  handleOnPressAction = () =>
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

  const litten = useRef(
    littenProp instanceof Litten ? littenProp : new Litten(littenProp),
  ).current

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
  const unit = useMemo(() => getUnit('length', useMetricUnits), [
    useMetricUnits,
  ])
  const FavIconComponent = useMemo(
    () => (isFavourite ? HeartFill : HeartOutline),
    [isFavourite],
  )

  const navigation = useNavigation()

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
    const speciesObject = getFromListByKey(littenSpeciesList, litten.species)
    const typeObject = getFromListByKey(littenTypes, litten.type)
    setUser(userInfo)
    setSpecies(speciesObject ?? {})
    setType(typeObject ?? {})
    setDistance(distanceRaw)
    setIsFavourite(!(getFavouriteIndex(litten, favourites) < 0))
    setIsLoading(false)
  }, [addLitten, addUser, distanceRaw, favourites, litten, littens, users])

  useEffect(() => {
    setUp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnPressLitten = () => {
    navigation.navigate(SCREEN_LITTEN_POST, { litten, user })
  }

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
      handleOnPressAction={handleOnPressAction}
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
