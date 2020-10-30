/**
 * @format
 * @flow
 */

import { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
import { UIHeader, UIIcon, UIImage, UIText } from 'ui-elements'
import {
  iconHeart,
  iconHeartOutline,
  iconLocation,
  iconSettings,
  placeholderCat,
} from 'images'
import Litten from 'model/litten'
import User from 'model/user'
import {
  UI_LITTEN_CARD_BORDER_RADIUS,
  UI_LITTEN_CARD_CONTENT_TO_CONTAINER_RATIO,
  UI_LITTEN_CARD_HEIGHT,
  UI_LITTEN_CARD_IMAGE_TO_CONTENT_RATIO,
  UI_LITTEN_CARD_SPACING,
} from 'utils/constants'
import dayjs from 'utils/day'
import { veryElevated as elevatedStyle } from 'styles/common'
import { SCREEN_LITTEN_POST } from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'
import {
  convertLength,
  distanceBetween,
  getFavouriteIndex,
  getFromListByKey,
  getUnit,
} from 'utils/functions'
import I18n, { translate } from 'utils/i18n'
import colors from 'styles/colors'

const LittenCard: (args: any) => React$Node = ({
  litten: littenProp,
  editable = false,
  authenticatedUser: {
    extra: {
      location: { coordinates: authenticatedUserCoordinates },
    },
    preferences: { useMetricUnits },
    saved: { favourites },
  },
  searchSettings,
  handleOnPressAction = () =>
    Alert.alert(translate('feedback.errorMessages.notImplemented')),
}) => {
  const litten = useRef(new Litten(littenProp)).current
  const user = useRef(new User({ id: litten.userUid })).current
  const species = getFromListByKey(littenSpeciesList, litten.species)
  const type = getFromListByKey(littenTypes, litten.type)
  const distanceKM = distanceBetween(
    litten.coordinates,
    authenticatedUserCoordinates,
  )
  const distance = convertLength(distanceKM, useMetricUnits)
  const distanceLocalized = I18n.toNumber(distance, {
    strip_insignificant_zeros: true,
  })
  const unit = getUnit('length', useMetricUnits)
  const createdTimestamp = litten.createdAt * 1000
  const isFavourite = !(getFavouriteIndex(litten, favourites) < 0)
  const favIcon = isFavourite ? iconHeart : iconHeartOutline

  const navigation = useNavigation()

  useEffect(() => {
    user.get()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              <UIText small bold noPadding>
                {user.displayName}
              </UIText>
              <UIText small noPadding>
                {dayjs(createdTimestamp).fromNow()}
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
  },
  cardContentFooterActionIcon: {
    tintColor: colors.black,
  },
  cardContentFooterUserInfo: {
    justifyContent: 'center',
  },
})

export default LittenCard
