/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { useFavourites, usePaddingBottom, useUserUid } from 'hooks'
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { vh, vw } from 'react-native-expo-viewport-units'
import Carousel from 'components/carousel'
import Litten from 'model/litten'
import User from 'model/user'
import LittenContactOptions from 'screens/litten/contact-options'
import LittenHeaderNavBar from 'screens/litten/header-nav-bar'
import {
  UIAvatar,
  UIButton,
  UIHeader,
  UIIcon,
  UIImage,
  UISeparator,
  UIText,
} from 'ui-elements'
import { Location as LocationIcon } from 'images/components/icons'
import { placeholderCat, placeholderUser } from 'images'
import {
  HeartFill,
  HeartOutline,
  Organization as OrganizationIcon,
} from 'images/components/icons'
import { stringifyLocation } from 'utils/functions'
import dayjs from 'utils/day'
import {
  PLACEHOLDER_USER_DISPLAY_NAME,
  STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO,
  STRUCTURE_PADDING_MULTIPLIER,
  STRUCTURE_TAB_NAV_BORDER_RADIUS,
  STRUCTURE_TAB_NAV_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
  UI_ICON_SIZE_MICRO,
  UI_ICON_SIZE_MINI,
} from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'
import {
  getFavouriteIndex,
  getFromListByKey,
  shortenName,
} from 'utils/functions'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const LittenPostScreen: (args: any) => React$Node = ({
  route: {
    params: { litten: littenProp, preview = false, user: userProp },
  },
}) => {
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const authenticatedUserUid = useUserUid()
  const [favourites, addFavourite, removeFavourite] = useFavourites()

  const litten = useRef(
    littenProp instanceof Litten ? littenProp : new Litten(littenProp),
  ).current
  const user = useRef(userProp instanceof User ? userProp : new User(userProp))
    .current
  const locationString = useMemo(
    () => (litten.location ? stringifyLocation(litten.location) : ''),
    [litten.location],
  )
  const favouriteIndex = useMemo(() => getFavouriteIndex(litten, favourites), [
    favourites,
    litten,
  ])
  const isFavourite = useMemo(() => !(favouriteIndex < 0), [favouriteIndex])
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
            source={
              typeof photoSource === 'string'
                ? { uri: photoSource }
                : photoSource
            }
            style={styles.mainImage}
            resizeMode="cover"
            key={i}
          />
        ),
      })),
    [litten.photos],
  )

  useEffect(() => {
    StatusBar.setHidden(true)

    return () => StatusBar.setHidden(false)
  }, [])

  const handleOnPressAction = useCallback(() => {
    if (isFavourite) {
      removeFavourite(favouriteIndex)
    } else {
      const littenObject = litten.toJSON()
      addFavourite(littenObject)
    }
  }, [addFavourite, favouriteIndex, isFavourite, litten, removeFavourite])

  const dismissModal = useCallback(() => setModalIsVisible(false), [])

  const handleOnPressCTA = useCallback(() => {
    if (preview) {
      Alert.alert(translate('easterEggs.tribute'))
    } else {
      setModalIsVisible(true)
    }
  }, [preview])

  const SpeciesIconComponent = species?.icon

  return (
    <View style={styles.littenPostContainer}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.littenPost}>
        <LittenHeaderNavBar litten={litten} preview={preview} />
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
        <View style={[styles.littenPostContent, withPaddingBottom]}>
          <View style={styles.littenPostContentHeader}>
            <UIHeader numberOfLines={1} style={styles.littenPostTitle}>
              {litten.title}
            </UIHeader>
            {preview && (
              <UIText bold>{translate('screens.littenPost.preview')}</UIText>
            )}
            {!preview && (
              <Pressable onPress={handleOnPressAction}>
                <UIIcon
                  IconComponent={FavIconComponent}
                  elevated="very"
                  circle
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
                  fill={colors.blue}
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
                fill={colors.blue}
                style={styles.littenPostContentSubHeaderIcon}
              />
              <UIHeader
                numberOfLines={2}
                subheader
                style={styles.littenPostContentHeaderLocation}>
                {locationString}
              </UIHeader>
            </View>
          )}
          <UISeparator invisible />
          <UIText bold>{translate('screens.littenPost.story')}</UIText>
          <UIText>
            {litten.story || translate('screens.littenPost.emptyStory')}
          </UIText>
        </View>
      </ScrollView>
      <View style={[styles.littenPostFooter, { height: heightBottom }]}>
        <View style={styles.littenPostFooterUser}>
          <UIAvatar
            source={user.photoURL ? { uri: user.photoURL } : placeholderUser}
          />
          <View style={styles.littenPostFooterUserInfo}>
            <View style={styles.littenPostFooterUserName}>
              <UIText numberOfLines={1} small bold noPadding>
                {shortenName(user.displayName) || PLACEHOLDER_USER_DISPLAY_NAME}
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
            <UIText noPadding>{dayjs(litten.createdAt).fromNow()}</UIText>
          </View>
        </View>
        {typeLabel && (
          <UIButton onPress={handleOnPressCTA} compact>
            {typeLabel}
          </UIButton>
        )}
      </View>
      <LittenContactOptions
        litten={litten}
        user={user}
        authenticatedUserUid={authenticatedUserUid}
        visible={modalIsVisible}
        onClickOutside={dismissModal}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  littenPostContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  littenPost: {
    flex: 1,
  },
  bulletContainerStyle: {
    bottom: vh(6),
  },
  mainImages: {
    width: '100%',
    height: vh(STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO * 100) * 1.1,
    position: 'absolute',
    top: 0,

    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: vh(STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO * 100) * 1.1,
  },
  mainImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightBlue,
  },
  littenPostContent: {
    minHeight: vh((1 - STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO) * 100),
    marginTop: vh(STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO * 100),
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT * STRUCTURE_PADDING_MULTIPLIER,
    borderTopLeftRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
    borderTopRightRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
    backgroundColor: colors.lightGray,
    padding: vw(6),
  },
  littenPostContentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  littenPostTitle: {
    flexShrink: 1,
    marginRight: 6,
  },
  littenPostContentSubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  littenPostContentSubHeaderIcon: {
    marginRight: 8,
  },
  littenPostContentHeaderLocation: {
    flexShrink: 1,
  },
  littenPostFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    height: STRUCTURE_TAB_NAV_HEIGHT,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    borderTopLeftRadius: STRUCTURE_TAB_NAV_BORDER_RADIUS,
    borderTopRightRadius: STRUCTURE_TAB_NAV_BORDER_RADIUS,
    backgroundColor: colors.white,
    zIndex: 1,
  },
  littenPostFooterUser: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  littenPostFooterUserInfo: {
    flex: 1,
    marginLeft: 16,
    marginRight: 24,
  },
  littenPostFooterUserName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameOrganizationIcon: {
    marginLeft: 6,
  },
  callOptionsContainer: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  favIconStyle: {
    tintColor: colors.red,
  },
})

export default LittenPostScreen
