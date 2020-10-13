/**
 * @format
 * @flow
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { vh, vw } from 'react-native-expo-viewport-units'
import Carousel from 'components/carousel'
import {
  UIAvatar,
  UIButton,
  UIHeader,
  UIIcon,
  UISeparator,
  UIText,
} from 'ui-elements'
import {
  iconGoBackArrow,
  iconHeartOutline,
  iconLocation,
  placeholderCat,
} from 'images'
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
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const LittenPostScreen: (args: any) => React$Node = ({ route }) => {
  const isPreview = !!route?.params?.preview
  const user = route?.params?.user
  const litten = route?.params?.litten
  const locationString = stringifyLocation(litten.location)

  const navigation = useNavigation()

  const postPictures = litten?.photos?.map((photoSource, i) => ({
    key: i,
    item: (
      <Image
        source={
          typeof photoSource === 'string' ? { uri: photoSource } : photoSource
        }
        style={styles.mainImage}
        resizeMode="cover"
        key={i}
      />
    ),
  }))

  const handleOnPressFavourite = () => {
    Alert.alert(translate('feedback.errorMessages.notImplemented'))
  }

  const handleOnPressCTA = () => {
    if (isPreview) {
      Alert.alert(translate('easterEggs.tribute'))
    }
  }

  const getFromList = (list, where) => list.find(({ key }) => key === where)

  const species = getFromList(littenSpeciesList, litten.species)
  const typeLabel = getFromList(littenTypes, litten.type)?.label

  return (
    <View style={styles.littenPostContainer}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.littenPost}>
        <SafeAreaView style={styles.littenPostGoBack}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={iconGoBackArrow}
              style={styles.goBack}
              resizeMode="contain"
            />
          </Pressable>
        </SafeAreaView>
        <Carousel
          bounces={false}
          bulletContainerStyle={styles.bulletContainerStyle}
          items={postPictures}
          placeholder={
            <Image
              source={placeholderCat}
              style={styles.mainImagePlaceholder}
              resizeMode="center"
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
              <Pressable onPress={handleOnPressFavourite}>
                <UIIcon icon={iconHeartOutline} elevated="very" circle />
              </Pressable>
            )}
          </View>
          {species && (
            <View style={styles.littenPostContentSubHeader}>
              <Image
                source={species.icon}
                resizeMode="contain"
                style={styles.littenPostContentSubHeaderIcon}
              />
              <UIHeader subheader>{species.label}</UIHeader>
            </View>
          )}
          {!!locationString && (
            <View style={styles.littenPostContentSubHeader}>
              <Image
                source={iconLocation}
                resizeMode="contain"
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
          <UIAvatar source={{ uri: user.photoURL }} />
          <View style={styles.littenPostFooterUserInfo}>
            <UIText style={styles.littenPostFooterUserInfoText} bold>
              {user.displayName}
            </UIText>
            <UIText style={styles.littenPostFooterUserInfoText}>
              {dayjs(litten?.metadata?.creationTime).fromNow()}
            </UIText>
          </View>
        </View>
        {typeLabel && (
          <UIButton onPress={handleOnPressCTA} compact>
            {typeLabel}
          </UIButton>
        )}
      </View>
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
    display: 'flex',
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
  littenPostFooterUserInfoText: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  },
})

export default LittenPostScreen
