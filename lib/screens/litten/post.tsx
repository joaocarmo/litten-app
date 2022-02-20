import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { useFavourite, usePaddingBottom, useUserUid, useTheme } from '@hooks'
import { Alert, Pressable, ScrollView, View } from 'react-native'
import Carousel from '@components/carousel'
import Litten from '@model/litten'
import User from '@model/user'
import LittenContactOptions from '@screens/litten/contact-options'
import LittenHeaderNavBar from '@screens/litten/header-nav-bar'
import {
  UIAvatar,
  UIButton,
  UIHeader,
  UIIcon,
  UIImage,
  UISeparator,
  UIText,
} from '@ui-elements'
import {
  Location as LocationIcon,
  HeartFill,
  HeartOutline,
  Organization as OrganizationIcon,
} from '@images/components/icons'
import { placeholderCat } from '@images'
import {
  stringifyLocation,
  getFromListByKey,
  shortenName,
} from '@utils/functions'
import dayjs from '@utils/day'
import {
  PLACEHOLDER_USER_DISPLAY_NAME,
  STRUCTURE_PADDING_MULTIPLIER,
  UI_ICON_SIZE_MICRO,
  UI_ICON_SIZE_MINI,
} from '@utils/constants'
import { littenSpeciesList, littenTypes } from '@utils/litten'
import { translate } from '@utils/i18n'
import postStyles from '@screens/litten/post.styles'
import type { LittenPostScreenProps } from '@utils/types/routes'
import type { IconTypeComponent } from '@ui-elements/types'
import type { BasicLitten } from '@model/types/litten'
import type { BasicUser } from '@model/types/user'

const LittenPostScreen = ({
  route: {
    params: { litten: littenProp, preview, user: userProp },
  },
}: LittenPostScreenProps) => {
  const [navBarOpacity, setNavBarOpacity] = useState(0)
  const [navBarInitialPosition, setNavBarInitialPosition] = useState(0)
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const contentRef = useRef(null)
  const authenticatedUserUid = useUserUid()
  const [isFavourite, toggleFavourite] = useFavourite(littenProp)
  const {
    createStyles,
    theme: { colors },
  } = useTheme()

  const styles = createStyles(postStyles)

  const litten = useMemo(
    () => (littenProp instanceof Litten ? littenProp : new Litten(littenProp)),
    [littenProp],
  )

  const user = useMemo(
    () => (userProp instanceof User ? userProp : new User(userProp)),
    [userProp],
  )

  const locationString = useMemo(
    () => (litten.location ? stringifyLocation(litten.location) : ''),
    [litten.location],
  )

  const FavIconComponent = useMemo(
    () => (isFavourite ? HeartFill : HeartOutline),
    [isFavourite],
  )

  const { paddingBottom: heightBottom } = usePaddingBottom()

  const withPaddingBottom = usePaddingBottom(STRUCTURE_PADDING_MULTIPLIER)

  const species = useMemo(
    () => getFromListByKey(littenSpeciesList, litten.species),
    [litten.species],
  )

  const typeLabel = useMemo(
    () => getFromListByKey(littenTypes, litten.type)?.label,
    [litten.type],
  )

  const postPictures = useMemo(
    () =>
      litten.photos?.map((photoSource, i) => ({
        key: i,
        item: (
          <UIImage
            source={photoSource}
            style={styles.mainImage}
            resizeMode="cover"
            // eslint-disable-next-line react/no-array-index-key
            key={i}
          />
        ),
      })),
    [litten.photos, styles.mainImage],
  )

  const handleOnScroll = useCallback(
    ({
      nativeEvent: {
        contentOffset: { y: contentOffsetY },
      },
    }) => {
      const opacity = Math.floor((contentOffsetY / navBarInitialPosition) * 100)
      setNavBarOpacity(opacity > 100 ? 100 : opacity)
    },
    [navBarInitialPosition],
  )

  useEffect(() => {
    if (contentRef && contentRef.current) {
      contentRef.current.measure((x, y, width, height, pageX, pageY) =>
        setNavBarInitialPosition(pageY),
      )
    }
  }, [])

  const dismissModal = useCallback(() => setModalIsVisible(false), [])

  const handleOnPressCTA = useCallback(() => {
    if (preview) {
      Alert.alert(translate('easterEggs.tribute'))
    } else {
      setModalIsVisible(true)
    }
  }, [preview])

  const SpeciesIconComponent = species?.icon as IconTypeComponent

  return (
    <View style={styles.littenPostContainer}>
      <LittenHeaderNavBar
        litten={litten as BasicLitten}
        opacity={navBarOpacity}
        preview={preview}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.littenPost}
        onScroll={handleOnScroll}
        scrollEventThrottle={16}
      >
        <Carousel
          bounces={false}
          bulletContainerStyle={styles.bulletContainerStyle}
          items={postPictures}
          placeholder={
            <UIImage
              source={placeholderCat}
              style={styles.mainImagePlaceholder}
            />
          }
          style={styles.mainImages}
          bulletContrast
          fill
        />
        <View
          style={[styles.littenPostContent, withPaddingBottom]}
          ref={contentRef}
        >
          <View style={styles.littenPostContentHeader}>
            <UIHeader numberOfLines={1} style={styles.littenPostTitle}>
              {litten.title}
            </UIHeader>
            {preview && (
              <UIText bold>{translate('screens.littenPost.preview')}</UIText>
            )}
            {!preview && (
              <Pressable onPress={toggleFavourite}>
                <UIIcon
                  circle
                  IconComponent={FavIconComponent}
                  iconStyle={styles.favIconStyle}
                />
              </Pressable>
            )}
          </View>
          {species && (
            <View style={styles.littenPostContentSubHeader}>
              {SpeciesIconComponent && (
                <SpeciesIconComponent
                  height={UI_ICON_SIZE_MINI}
                  width={UI_ICON_SIZE_MINI}
                  fill={colors.secondary}
                  style={styles.littenPostContentSubHeaderIcon}
                />
              )}
              <UIHeader subheader>{species.label}</UIHeader>
            </View>
          )}
          {!!locationString && (
            <View style={styles.littenPostContentSubHeader}>
              <LocationIcon
                height={UI_ICON_SIZE_MINI}
                width={UI_ICON_SIZE_MINI}
                fill={colors.secondary}
                style={styles.littenPostContentSubHeaderIcon}
              />
              <UIHeader
                numberOfLines={2}
                subheader
                style={styles.littenPostContentHeaderLocation}
              >
                {locationString}
              </UIHeader>
            </View>
          )}
          <UISeparator invisible small />
          <UIText bold>{translate('screens.littenPost.story')}</UIText>
          <UIText>
            {litten.story || translate('screens.littenPost.emptyStory')}
          </UIText>
        </View>
      </ScrollView>
      <View
        style={[
          styles.littenPostFooter,
          {
            height: heightBottom,
          },
        ]}
      >
        <View style={styles.littenPostFooterUser}>
          <UIAvatar source={user.photoURL} />
          <View style={styles.littenPostFooterUserInfo}>
            <View style={styles.littenPostFooterUserName}>
              <UIText numberOfLines={1} small bold noPadding>
                {shortenName(user.displayName as string) ||
                  PLACEHOLDER_USER_DISPLAY_NAME}
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
            <UIText noPadding>
              {dayjs(litten.createdAt as number).fromNow()}
            </UIText>
          </View>
        </View>
        {typeLabel && (
          <UIButton onPress={handleOnPressCTA} compact>
            {typeLabel}
          </UIButton>
        )}
      </View>
      <LittenContactOptions
        litten={litten as BasicLitten}
        user={user as BasicUser}
        authenticatedUserUid={authenticatedUserUid}
        visible={modalIsVisible}
        onClickOutside={dismissModal}
      />
    </View>
  )
}

LittenPostScreen.defaultProps = {
  route: {
    params: { litten: {}, preview: false, user: {} },
  },
}

export default LittenPostScreen
