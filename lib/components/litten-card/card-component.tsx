import { memo, useCallback, useMemo, useRef } from 'react'
import type { FC } from 'react'
import { Platform, Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme, useUnit } from '@hooks'
import { UIHeader, UIIcon, UIImage, UIText } from '@ui-elements'
import { placeholderCat } from '@images'
import {
  Cog as CogIcon,
  HeartFill,
  HeartOutline,
  Location as LocationIcon,
  Organization as OrganizationIcon,
} from '@images/components/icons'
import { littenSpeciesList, littenTypes } from '@utils/litten'
import {
  SCREEN_LITTEN_POST,
  UI_ICON_SIZE_MICRO,
  UI_ICON_SIZE_MINI,
} from '@utils/constants'
import dayjs from '@utils/day'
import { convertLength, getFromListByKey, shortenName } from '@utils/functions'
import I18n from '@utils/i18n'
import { debugLog } from '@utils/dev'
import type { LittenCardComponentProps } from '@components/litten-card/types'
import cardComponentStyles from '@components/litten-card/card-component.styles'

const UI_ICON_SIZE_MICRO_MINI_AVG = (UI_ICON_SIZE_MICRO + UI_ICON_SIZE_MINI) / 2

const areEqual = (prevProps, nextProps) =>
  prevProps.distance === nextProps.distance &&
  prevProps.isFavourite === nextProps.isFavourite &&
  prevProps.litten.id === nextProps.litten.id &&
  prevProps.user.id === nextProps.user.id

const LittenCardComponent: (props: LittenCardComponentProps) => FC = ({
  distance: distanceKM,
  editable = false,
  isFavourite = false,
  litten = {},
  onPressAction,
  user = {},
}) => {
  const [unit, useMetricUnits] = useUnit('length')

  const navigation = useNavigation()

  const {
    createStyles,
    theme: { colors },
    commonStyles: {
      commonStyles: { cardElevated },
    },
  } = useTheme()

  const iosElevated = Platform.OS === 'ios' ? cardElevated : undefined
  const androidElevated = Platform.OS === 'android' ? cardElevated : undefined

  const styles = createStyles(cardComponentStyles)

  debugLog('LittenCardComponent', litten.id)

  const distance = useMemo(
    () => convertLength(distanceKM, useMetricUnits),
    [distanceKM, useMetricUnits],
  )

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

  const FavIconComponent = useMemo(
    () => (isFavourite ? HeartFill : HeartOutline),
    [isFavourite],
  )

  const handleOnPressLitten = useCallback(() => {
    navigation.navigate(SCREEN_LITTEN_POST, { litten, user })
  }, [litten, navigation, user])

  const handleOnPressAction = useCallback(() => {
    onPressAction(litten)
  }, [onPressAction, litten])

  return (
    <Pressable
      onPress={handleOnPressLitten}
      style={[styles.cardContainer, iosElevated]}
    >
      <View style={[styles.cardImageContainer, androidElevated]}>
        {litten.mainPhoto ? (
          <UIImage
            source={litten.mainPhoto}
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
              style={styles.cardContentTitle}
            >
              {litten.title}
            </UIHeader>
            {SpeciesIconComponent && (
              <SpeciesIconComponent
                height={UI_ICON_SIZE_MICRO_MINI_AVG}
                width={UI_ICON_SIZE_MICRO_MINI_AVG}
                fill={colors.secondary}
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
                  fill={colors.secondary}
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
                  fill={colors.secondary}
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
                    fill={colors.secondary}
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

export default memo<LittenCardComponentProps>(LittenCardComponent, areEqual)
