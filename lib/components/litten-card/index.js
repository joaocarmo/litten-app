/**
 * @format
 * @flow
 */

import { useNavigation } from '@react-navigation/native'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
import { UIHeader, UIIcon, UIImage, UIText } from 'ui-elements'
import { iconHeartOutline, iconLocation, placeholderCat } from 'images'
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
  getFromListByKey,
  getUnit,
} from 'utils/functions'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const LittenCard: (args: any) => React$Node = ({
  litten,
  authenticatedUser: {
    extra: {
      location: { coordinates: authenticatedUserCoordinates },
    },
    preferences: { useMetricUnits },
  },
  searchSettings: {
    filters: {
      littenSpecies: filterSpecies,
      littenType: filterType,
      locationRadius: filterRadius,
    },
  },
}) => {
  const {
    location: { coordinates },
    metadata: { createdAt },
    photos,
    title,
    user,
  } = litten
  const species = getFromListByKey(littenSpeciesList, litten.species)
  const type = getFromListByKey(littenTypes, litten.type)
  const distanceKM = distanceBetween(coordinates, authenticatedUserCoordinates)
  const distance = convertLength(distanceKM, useMetricUnits)
  const unit = getUnit('length', useMetricUnits)
  const createdTimestamp = createdAt?.toMillis() ?? 0

  const navigation = useNavigation()

  const isFilteredOut = () => {
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

    return false
  }

  const handleOnPressLitten = () => {
    navigation.navigate(SCREEN_LITTEN_POST, {
      litten,
      user,
    })
  }

  const handleOnPressFavourite = () => {
    Alert.alert(translate('feedback.errorMessages.notImplemented'))
  }

  if (isFilteredOut()) {
    return null
  }

  return (
    <Pressable onPress={handleOnPressLitten} style={styles.cardContainer}>
      <View style={[elevatedStyle, styles.cardImageContainer]}>
        {photos && photos.length ? (
          <UIImage
            source={{ uri: photos[0] }}
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
            <UIHeader subheader>{title}</UIHeader>
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
              <UIText style={styles.cardContentFooterUserInfoText} bold>
                {type?.label}
              </UIText>
            </View>
            <View style={styles.cardContentSubHeader}>
              <UIImage
                source={iconLocation}
                style={styles.cardContentSubHeaderIcon}
              />
              <UIText style={styles.cardContentFooterUserInfoText}>
                {`${distance} ${unit}`}
              </UIText>
            </View>
          </View>
          <View style={styles.cardContentHeaderFooter}>
            <View style={styles.cardContentFooterUserInfo}>
              <UIText style={styles.cardContentFooterUserInfoText} small bold>
                {user.displayName}
              </UIText>
              <UIText style={styles.cardContentFooterUserInfoText} small>
                {dayjs(createdTimestamp).fromNow()}
              </UIText>
            </View>
            <Pressable onPress={handleOnPressFavourite}>
              <UIIcon
                icon={iconHeartOutline}
                size="mini"
                circle
                style={styles.cardContentFooterFavourite}
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
  cardContentFooterFavourite: {
    backgroundColor: colors.lightGray,
    shadowOpacity: 0.08,
  },
  cardContentFooterUserInfo: {
    justifyContent: 'center',
  },
  cardContentFooterUserInfoText: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  },
})

export default LittenCard
