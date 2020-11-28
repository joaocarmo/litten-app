/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
import { UIHeader, UIIcon, UIImage, UIText } from 'ui-elements'
import {
  iconHeart,
  iconHeartOutline,
  iconLocation,
  iconOrganization,
  iconSettings,
  placeholderCat,
} from 'images'
import Litten from 'model/litten'
import User from 'model/user'
import {
  SCREEN_LITTEN_POST,
  UI_LITTEN_CARD_BORDER_RADIUS,
  UI_LITTEN_CARD_CONTENT_TO_CONTAINER_RATIO,
  UI_LITTEN_CARD_HEIGHT,
  UI_LITTEN_CARD_IMAGE_TO_CONTENT_RATIO,
  UI_LITTEN_CARD_SPACING,
} from 'utils/constants'
import dayjs from 'utils/day'
import { veryElevated as elevatedStyle } from 'styles/common'
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
  const [user, setUser] = useState({})
  const [litten, setLitten] = useState(littenProp)
  const [isLoading, setIsLoading] = useState(true)
  const [species, setSpecies] = useState({})
  const [type, setType] = useState({})
  const [distance, setDistance] = useState(0)
  const [isFavourite, setIsFavourite] = useState(false)
  const distanceLocalized = I18n.toNumber(distance, {
    strip_insignificant_zeros: true,
  })
  const unit = useRef(getUnit('length', useMetricUnits)).current
  const favIcon = isFavourite ? iconHeart : iconHeartOutline

  const navigation = useNavigation()

  const setUp = useCallback(async () => {
    const littenModel = new Litten(littenProp)
    const userInfo: any = new User({ id: littenModel.userUid })
    await userInfo.get()
    littenModel.user = userInfo
    const distanceKM = distanceBetween(
      littenModel.coordinates,
      authenticatedUserCoordinates,
    )
    const distanceRaw = convertLength(distanceKM, useMetricUnits)
    setUser(userInfo)
    setLitten(littenModel)
    setSpecies(getFromListByKey(littenSpeciesList, littenModel.species))
    setType(getFromListByKey(littenTypes, littenModel.type))
    setDistance(distanceRaw)
    setIsFavourite(!(getFavouriteIndex(littenModel, favourites) < 0))
    setIsLoading(false)
  }, [authenticatedUserCoordinates, favourites, littenProp, useMetricUnits])

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

  return (
    <Pressable onPress={handleOnPressLitten} style={styles.cardContainer}>
      <View style={[elevatedStyle, styles.cardImageContainer]}>
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
        <View style={[elevatedStyle, styles.cardContent]}>
          <View style={styles.cardContentHeaderFooter}>
            <UIHeader subheader>{litten.title}</UIHeader>
            <UIImage
              source={species?.icon}
              style={styles.cardContentSubHeaderIcon}
            />
          </View>
          <View style={styles.cardContentMain}>
            <View style={styles.cardContentSubHeader}>
              <UIImage
                source={type?.icon}
                style={styles.cardContentSubHeaderIcon}
              />
              <UIText bold noPadding>
                {type?.label}
              </UIText>
            </View>
            {distance > 0 ? (
              <View style={styles.cardContentSubHeader}>
                <UIImage
                  source={iconLocation}
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
                  <UIImage
                    source={iconOrganization}
                    style={styles.nameOrganizationIcon}
                  />
                )}
              </View>
              <UIText small noPadding>
                {dayjs(litten.createdAt).fromNow()}
              </UIText>
            </View>
            <Pressable onPress={handleOnPressAction}>
              <UIIcon
                icon={editable ? iconSettings : favIcon}
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
    paddingLeft: UI_LITTEN_CARD_SPACING / 4,
    paddingRight: UI_LITTEN_CARD_SPACING / 4,
  },
  cardImageContainer: {
    height: '100%',
    width: `${UI_LITTEN_CARD_IMAGE_TO_CONTENT_RATIO * 100}%`,
    borderRadius: UI_LITTEN_CARD_BORDER_RADIUS,
    backgroundColor: colors.gray,
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
    shadowOpacity: 0.08,
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
    height: 16,
    width: 16,
    marginRight: 8,
  },
  cardContentMain: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  cardContentFooterAction: {
    backgroundColor: colors.lightGray,
    shadowOpacity: 0.08,
    marginLeft: 14,
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
    height: 12,
    width: 12,
    marginLeft: 6,
  },
})

export default LittenCard
