/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
import { useCache } from 'hooks'
import { UIHeader, UIIcon, UIImage, UIText } from 'ui-elements'
import { placeholderCat } from 'images'
import {
  Cog as CogIcon,
  HeartFill,
  HeartOutline,
  Location as LocationIcon,
  Organization as OrganizationIcon,
} from 'images/components/icons'
import Litten from 'model/litten'
import User from 'model/user'
import {
  SCREEN_LITTEN_POST,
  UI_ICON_SIZE_MICRO,
  UI_ICON_SIZE_MINI,
  UI_LITTEN_CARD_BORDER_RADIUS,
  UI_LITTEN_CARD_CONTENT_TO_CONTAINER_RATIO,
  UI_LITTEN_CARD_HEIGHT,
  UI_LITTEN_CARD_IMAGE_TO_CONTENT_RATIO,
  UI_LITTEN_CARD_SPACING,
} from 'utils/constants'
import dayjs from 'utils/day'
import { cardElevated } from 'styles/common'
import { littenSpeciesList, littenTypes } from 'utils/litten'
import {
  convertLength,
  distanceBetween,
  getFavouriteIndex,
  getFromListByKey,
  getUnit,
  shortenName,
} from 'utils/functions'
import I18n, { translate } from 'utils/i18n'
import colors from 'styles/colors'

const UI_ICON_MARGIN = 8
const UI_ICON_SIZE_MICRO_MINI_AVG = (UI_ICON_SIZE_MICRO + UI_ICON_SIZE_MINI) / 2

const LittenCard: (args: any) => React$Node = ({
  litten: littenProp,
  editable = false,
  authenticatedUser: {
    extra: {
      location: { coordinates: authenticatedUserCoordinates } = {
        coordinates: {
          latitude: null,
          longitude: null,
        },
      },
    },
    preferences: { useMetricUnits },
    saved: { favourites },
  },
  searchSettings,
  handleOnPressAction = () =>
    Alert.alert(translate('feedback.errorMessages.notImplemented')),
}) => {
  const [users, addUser] = useCache('users')
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [species, setSpecies] = useState({})
  const [type, setType] = useState({})
  const [distance, setDistance] = useState(0)
  const [isFavourite, setIsFavourite] = useState(false)
  const distanceLocalized = I18n.toNumber(distance, {
    strip_insignificant_zeros: true,
  })
  const litten = useRef(
    littenProp instanceof Litten ? littenProp : new Litten(littenProp),
  ).current
  const distanceKM = distanceBetween(
    litten.coordinates,
    authenticatedUserCoordinates,
  )
  const distanceRaw = convertLength(distanceKM, useMetricUnits)
  const unit = getUnit('length', useMetricUnits)
  const FavIconComponent = isFavourite ? HeartFill : HeartOutline

  const navigation = useNavigation()

  const setUp = useCallback(async () => {
    const userUid = litten.userUid ?? ''
    let userInfo = users[userUid]
    if (!userInfo) {
      userInfo = new User({ id: userUid })
      await userInfo.get()
      const newUser = userInfo.toJSON()
      addUser(newUser)
    } else {
      userInfo = new User(userInfo)
    }
    setUser(userInfo)
    setSpecies(getFromListByKey(littenSpeciesList, litten.species))
    setType(getFromListByKey(littenTypes, litten.type))
    setDistance(distanceRaw)
    setIsFavourite(!(getFavouriteIndex(litten, favourites) < 0))
    setIsLoading(false)
  }, [addUser, distanceRaw, favourites, litten, users])

  useEffect(() => {
    setUp()
  }, [setUp])

  const isFilteredOut = () => {
    if (searchSettings) {
      const {
        filters: {
          littenSpecies: filterSpecies,
          littenType: filterType,
          locationRadius: filterRadius,
        },
      } = searchSettings

      if (
        filterSpecies.length &&
        species?.key &&
        !filterSpecies.includes(species.key)
      ) {
        return true
      }

      if (filterType.length && type?.key && !filterType.includes(type.key)) {
        return true
      }

      if (filterRadius && filterRadius < distance) {
        return true
      }
    }

    return false
  }

  const handleOnPressLitten = () => {
    navigation.navigate(SCREEN_LITTEN_POST, { litten, user })
  }

  if (isFilteredOut()) {
    return null
  }

  if (isLoading) {
    return null
  }

  const SpeciesIconComponent = species?.icon
  const TypeIconComponent = type?.icon

  return (
    <Pressable onPress={handleOnPressLitten} style={styles.cardContainer}>
      <View style={[styles.cardImageContainer, cardElevated]}>
        {litten.photos.length > 0 ? (
          <UIImage
            source={{ uri: litten.mainPhoto }}
            resizeMode="cover"
            style={styles.cardImage}
          />
        ) : (
          <UIImage
            source={placeholderCat}
            style={[styles.cardImage, styles.cardImagePlaceholder]}
          />
        )}
      </View>
      <View style={styles.cardContentContainer}>
        <View style={[styles.cardContent, cardElevated]}>
          <View style={styles.cardContentHeaderFooter}>
            <UIHeader
              numberOfLines={1}
              subheader
              style={styles.cardContentTitle}>
              {litten.title}
            </UIHeader>
            {SpeciesIconComponent && (
              <SpeciesIconComponent
                height={UI_ICON_SIZE_MICRO_MINI_AVG}
                width={UI_ICON_SIZE_MICRO_MINI_AVG}
                fill={colors.blue}
                style={styles.cardContentSubHeaderIcon}
              />
            )}
          </View>
          <View style={styles.cardContentMain}>
            <View style={styles.cardContentSubHeader}>
              {TypeIconComponent && (
                <TypeIconComponent
                  height={UI_ICON_SIZE_MICRO_MINI_AVG}
                  width={UI_ICON_SIZE_MICRO_MINI_AVG}
                  fill={colors.blue}
                  style={styles.cardContentSubHeaderIcon}
                />
              )}
              <UIText bold noPadding>
                {type?.label}
              </UIText>
            </View>
            {distance > 0 ? (
              <View style={styles.cardContentSubHeader}>
                <LocationIcon
                  height={UI_ICON_SIZE_MICRO_MINI_AVG}
                  width={UI_ICON_SIZE_MICRO_MINI_AVG}
                  fill={colors.blue}
                  style={styles.cardContentSubHeaderIcon}
                />
                <UIText noPadding>{`${distanceLocalized} ${unit}`}</UIText>
              </View>
            ) : (
              <UIText noPadding numberOfLines={1}>
                {litten.story}
              </UIText>
            )}
          </View>
          <View style={styles.cardContentHeaderFooter}>
            <View style={styles.cardContentFooterUserInfo}>
              <View style={styles.cardContentFooterUserName}>
                <UIText numberOfLines={1} small bold noPadding>
                  {shortenName(user.displayName)}
                </UIText>
                {user.isOrganization && (
                  <OrganizationIcon
                    height={UI_ICON_SIZE_MICRO}
                    width={UI_ICON_SIZE_MICRO}
                    fill={colors.blue}
                    style={styles.nameOrganizationIcon}
                  />
                )}
              </View>
              <UIText numberOfLines={1} small noPadding>
                {dayjs(litten.createdAt).fromNow()}
              </UIText>
            </View>
            <Pressable onPress={handleOnPressAction}>
              <UIIcon
                IconComponent={editable ? CogIcon : FavIconComponent}
                size="mini"
                circle
                iconStyle={styles.cardContentFooterActionIcon}
                style={styles.cardContentFooterAction}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    height: UI_LITTEN_CARD_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    paddingTop: UI_LITTEN_CARD_SPACING / 2,
    paddingBottom: UI_LITTEN_CARD_SPACING / 2,
    paddingLeft: UI_LITTEN_CARD_SPACING / 3,
    paddingRight: UI_LITTEN_CARD_SPACING / 3,
  },
  cardImageContainer: {
    height: '100%',
    width: `${UI_LITTEN_CARD_IMAGE_TO_CONTENT_RATIO * 100}%`,
    borderRadius: UI_LITTEN_CARD_BORDER_RADIUS,
    backgroundColor: colors.gray,
    overflow: 'hidden',
  },
  cardImage: {
    height: '100%',
    width: '100%',
    borderRadius: UI_LITTEN_CARD_BORDER_RADIUS,
  },
  cardImagePlaceholder: {
    backgroundColor: colors.lightBlue,
  },
  cardContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardContent: {
    justifyContent: 'space-between',
    height: `${UI_LITTEN_CARD_CONTENT_TO_CONTAINER_RATIO * 100}%`,
    padding: 12,
    paddingLeft: 18,
    backgroundColor: colors.white,
    borderTopRightRadius: UI_LITTEN_CARD_BORDER_RADIUS,
    borderBottomRightRadius: UI_LITTEN_CARD_BORDER_RADIUS,
  },
  cardContentTitle: {
    flexShrink: 1,
  },
  cardContentHeaderFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContentSubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContentSubHeaderIcon: {
    marginRight: UI_ICON_MARGIN,
  },
  cardContentMain: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  cardContentFooterAction: {
    backgroundColor: colors.lightGray,
    shadowOpacity: 0.08,
    marginLeft: 14,
    marginRight: UI_ICON_MARGIN - UI_ICON_SIZE_MICRO_MINI_AVG / 4,
  },
  cardContentFooterActionIcon: {
    tintColor: colors.black,
  },
  cardContentFooterUserInfo: {
    flex: 1,
    paddingRight: 12,
    justifyContent: 'center',
  },
  cardContentFooterUserName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameOrganizationIcon: {
    marginLeft: 6,
  },
})

export default LittenCard
