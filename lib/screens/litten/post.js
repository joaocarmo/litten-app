/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthenticatedUserActions } from 'store/actions/authenticated-user'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
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
import { Left as LeftArrow } from 'images/components/arrows'
import { placeholderCat, placeholderUser } from 'images'
import {
  HeartFill,
  HeartOutline,
  Organization as OrganizationIcon,
} from 'images/components/icons'
import { stringifyLocation } from 'utils/functions'
import dayjs from 'utils/day'
import {
  STRUCTURE_GO_BACK_BUTTON_SIZE,
  STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO,
  STRUCTURE_PADDING_MULTIPLIER,
  STRUCTURE_TAB_NAV_BORDER_RADIUS,
  STRUCTURE_TAB_NAV_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_MARGIN,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM,
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
import type { Dispatch, State } from 'store/types/state'
import type { AuthenticatedUser } from 'store/types'
import type { BasicUser } from 'model/types/user'
import type { BasicLitten } from 'model/types/litten'

type OwnProps = {|
  route: {
    params: {
      litten: BasicLitten,
      preview: boolean,
      user: BasicUser,
    },
  },
|}
type StateProps = {|
  +authenticatedUser: AuthenticatedUser,
|}
type AuthUserActions = typeof AuthenticatedUserActions
type DispatchProps = {|
  ...AuthUserActions,
|}
type LittenPostProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const mapStateToProps = (state: State): StateProps => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(AuthenticatedUserActions, dispatch)

const LittenPostScreen: (args: any) => React$Node = ({
  addFavourite,
  authenticatedUser: {
    extra: { id: authenticatedUserUid },
    saved: { favourites },
  },
  removeFavourite,
  route: {
    params: { litten: littenProp, preview = false, user: userProp },
  },
}) => {
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const litten =
    littenProp instanceof Litten ? littenProp : new Litten(littenProp)
  const user = userProp instanceof User ? userProp : new User(userProp)
  const locationString = litten.location
    ? stringifyLocation(litten.location)
    : ''
  const favouriteIndex = getFavouriteIndex(litten, favourites)
  const isFavourite = !(favouriteIndex < 0)
  const FavIconComponent = isFavourite ? HeartFill : HeartOutline

  const navigation = useNavigation()

  const insets = useSafeAreaInsets()

  const notAndroid = Platform.OS !== 'android'

  const species = getFromListByKey(littenSpeciesList, litten.species)
  const typeLabel = getFromListByKey(littenTypes, litten.type)?.label

  const postPictures = litten.photos?.map((photoSource, i) => ({
    key: i,
    item: (
      <UIImage
        source={
          typeof photoSource === 'string' ? { uri: photoSource } : photoSource
        }
        style={styles.mainImage}
        resizeMode="cover"
        key={i}
      />
    ),
  }))

  useEffect(() => {
    StatusBar.setHidden(true)

    return () => StatusBar.setHidden(false)
  }, [])

  const handleOnPressAction = () => {
    if (isFavourite) {
      removeFavourite(favouriteIndex)
    } else {
      const littenObject = litten.toJSON()
      addFavourite(littenObject)
    }
  }

  const dismissModal = () => setModalIsVisible(false)

  const handleOnPressCTA = () => {
    if (preview) {
      Alert.alert(translate('easterEggs.tribute'))
    } else {
      setModalIsVisible(true)
    }
  }

  const SpeciesIconComponent = species?.icon

  return (
    <View style={styles.littenPostContainer}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.littenPost}>
        {notAndroid && (
          <SafeAreaView style={styles.littenPostGoBack}>
            <Pressable onPress={() => navigation.goBack()}>
              <LeftArrow
                width={STRUCTURE_GO_BACK_BUTTON_SIZE}
                height={STRUCTURE_GO_BACK_BUTTON_SIZE}
                fill={colors.white}
              />
            </Pressable>
          </SafeAreaView>
        )}
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
          style={[
            styles.littenPostContent,
            {
              paddingBottom:
                (STRUCTURE_TAB_NAV_HEIGHT + insets.bottom) *
                STRUCTURE_PADDING_MULTIPLIER,
            },
          ]}>
          <View style={styles.littenPostContentHeader}>
            <UIHeader>{litten.title}</UIHeader>
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
              <UIHeader subheader>{locationString}</UIHeader>
            </View>
          )}
          <UISeparator invisible />
          <UIText bold>{translate('screens.littenPost.story')}</UIText>
          <UIText>
            {litten.story || translate('screens.littenPost.emptyStory')}
          </UIText>
        </View>
      </ScrollView>
      <View
        style={[
          styles.littenPostFooter,
          { height: STRUCTURE_TAB_NAV_HEIGHT + insets.bottom },
        ]}>
        <View style={styles.littenPostFooterUser}>
          <UIAvatar
            source={user.photoURL ? { uri: user.photoURL } : placeholderUser}
          />
          <View style={styles.littenPostFooterUserInfo}>
            <View style={styles.littenPostFooterUserName}>
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
  littenPostGoBack: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    top: 0,
    height:
      STRUCTURE_TEMPLATE_SCREEN_HEADER_HEIGHT +
      STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM,
    marginLeft: STRUCTURE_TEMPLATE_SCREEN_HEADER_MARGIN,
    zIndex: 1,
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
  littenPostContentSubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  littenPostContentSubHeaderIcon: {
    marginRight: 8,
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

export default connect<
  LittenPostProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(LittenPostScreen)
