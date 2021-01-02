/**
 * @format
 * @flow
 */

import { useCallback, useMemo, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useUnit } from 'hooks'
import { Platform, Pressable, StyleSheet, View } from 'react-native'
import { UIHeader, UIIcon, UIImage, UIText } from 'ui-elements'
import { placeholderCat } from 'images'
import {
  Cog as CogIcon,
  Location as LocationIcon,
  Organization as OrganizationIcon,
} from 'images/components/icons'
import { littenSpeciesList, littenTypes } from 'utils/litten'
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
import { convertLength, getFromListByKey, shortenName } from 'utils/functions'
import I18n from 'utils/i18n'
import colors from 'styles/colors'

const UI_ICON_MARGIN = 8
const UI_ICON_SIZE_MICRO_MINI_AVG = (UI_ICON_SIZE_MICRO + UI_ICON_SIZE_MINI) / 2
const iosElevated = Platform.OS === 'ios' ? cardElevated : undefined
const androidElevated = Platform.OS === 'android' ? cardElevated : undefined

const LittenCardComponent: (args: any) => React$Node = ({
  distance: distanceKM,
  editable = false,
  FavIconComponent = null,
  handleOnPressAction,
  litten = {},
  user = {},
}) => {
  const [unit, useMetricUnits] = useUnit('length')

  const navigation = useNavigation()

  const distance = useMemo(() => convertLength(distanceKM, useMetricUnits), [
    distanceKM,
    useMetricUnits,
  ])

  const distanceLocalized = useMemo(
    () =>
      I18n.toNumber(distance, {
        strip_insignificant_zeros: true,
      }),
    [distance],
  )

  const species = useRef(
    getFromListByKey(littenSpeciesList, litten.species) ?? {},
  ).current
  const type = useRef(getFromListByKey(littenTypes, litten.type) ?? {}).current
  const SpeciesIconComponent = useRef(species?.icon).current
  const TypeIconComponent = useRef(type?.icon).current

  const handleOnPressLitten = useCallback(() => {
    navigation.navigate(SCREEN_LITTEN_POST, { litten, user })
  }, [litten, navigation, user])

  return (
    <Pressable
      onPress={handleOnPressLitten}
      style={[styles.cardContainer, iosElevated]}>
      <View style={[styles.cardImageContainer, androidElevated]}>
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
        <View style={[styles.cardContent, androidElevated]}>
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

export default LittenCardComponent
