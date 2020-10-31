/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUser from 'store/actions/authenticated-user'
import { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { vh, vw } from 'react-native-expo-viewport-units'
import Carousel from 'components/carousel'
import LittenContactOptions from './contact-options'
import {
  UIAvatar,
  UIButton,
  UIHeader,
  UIIcon,
  UIImage,
  UISeparator,
  UIText,
} from 'ui-elements'
import {
  iconGoBackArrow,
  iconHeart,
  iconHeartOutline,
  iconLocation,
  placeholderCat,
  placeholderUser,
} from 'images'
import Litten from 'model/litten'
import { stringifyLocation } from 'utils/functions'
import dayjs from 'utils/day'
import {
  STRUCTURE_GO_BACK_BUTTON_SIZE,
  STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO,
  STRUCTURE_TAB_NAV_BORDER_RADIUS,
  STRUCTURE_TAB_NAV_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_MARGIN,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM,
} from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'
import { getFavouriteIndex, getFromListByKey } from 'utils/functions'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthenticatedUser, dispatch)

const LittenPostScreen: (args: any) => React$Node = ({
  addFavourite,
  authenticatedUser: {
    saved: { favourites },
  },
  removeFavourite,
  route,
}) => {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const isPreview = !!route?.params?.preview
  const user = route?.params?.user
  const litten = useRef(new Litten(route?.params?.litten)).current
  const locationString = stringifyLocation(litten.location)
  const favouriteIndex = getFavouriteIndex(litten, favourites)
  const isFavourite = !(favouriteIndex < 0)
  const favIcon = isFavourite ? iconHeart : iconHeartOutline

  const navigation = useNavigation()

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

  const handleOnPressAction = () => {
    if (isFavourite) {
      removeFavourite(favouriteIndex)
    } else {
      addFavourite(litten)
    }
  }

  const dismissModal = () => setModalIsVisible(false)

  const handleOnPressCTA = () => {
    if (isPreview) {
      Alert.alert(translate('easterEggs.tribute'))
    } else {
      setModalIsVisible(true)
    }
  }

  const species = getFromListByKey(littenSpeciesList, litten.species)
  const typeLabel = getFromListByKey(littenTypes, litten.type)?.label

  return (
    <View style={styles.littenPostContainer}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.littenPost}>
        <SafeAreaView style={styles.littenPostGoBack}>
          <Pressable onPress={() => navigation.goBack()}>
            <UIImage source={iconGoBackArrow} style={styles.goBack} />
          </Pressable>
        </SafeAreaView>
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
        <View style={styles.littenPostContent}>
          <View style={styles.littenPostContentHeader}>
            <UIHeader>{litten.title}</UIHeader>
            {isPreview && (
              <UIText bold>{translate('screens.littenPost.preview')}</UIText>
            )}
            {!isPreview && (
              <Pressable onPress={handleOnPressAction}>
                <UIIcon icon={favIcon} elevated="very" circle />
              </Pressable>
            )}
          </View>
          {species && (
            <View style={styles.littenPostContentSubHeader}>
              <UIImage
                source={species.icon}
                style={styles.littenPostContentSubHeaderIcon}
              />
              <UIHeader subheader>{species.label}</UIHeader>
            </View>
          )}
          {!!locationString && (
            <View style={styles.littenPostContentSubHeader}>
              <UIImage
                source={iconLocation}
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
      <View style={styles.littenPostFooter}>
        <View style={styles.littenPostFooterUser}>
          <UIAvatar
            source={user.photoURL ? { uri: user.photoURL } : placeholderUser}
          />
          <View style={styles.littenPostFooterUserInfo}>
            <UIText bold noPadding>
              {user.displayName}
            </UIText>
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
  goBack: {
    height: STRUCTURE_GO_BACK_BUTTON_SIZE,
    width: STRUCTURE_GO_BACK_BUTTON_SIZE,
    tintColor: colors.white,
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
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT * 1.2,
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
    height: 20,
    width: 20,
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
    marginLeft: 16,
  },
  callOptionsContainer: {
    flex: 1,
    backgroundColor: 'yellow',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LittenPostScreen)
