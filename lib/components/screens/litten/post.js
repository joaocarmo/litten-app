/**
 * @format
 * @flow
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { vh, vw } from 'react-native-expo-viewport-units'
import Carousel from 'components/carousel'
import { UIAvatar, UIButton, UIHeader, UISeparator, UIText } from 'ui-elements'
import { iconGoBackArrow, placeholderCat, typeFound } from 'images'
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
import { user as fakeUser, littenAdopt as fakeLitten } from 'data/fake'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const LittenPostScreen: (args: any) => React$Node = ({ route }) => {
  const isPreview = !!route?.params?.preview
  const user = route?.params?.user || fakeUser
  const litten = route?.params?.litten || fakeLitten

  const navigation = useNavigation()

  const postPictures = litten?.photos.map((photoPath, i) => ({
    key: i,
    item: (
      <Image
        source={{ uri: photoPath }}
        style={styles.mainImage}
        resizeMode="cover"
        key={i}
      />
    ),
  }))

  const handleOnPress = () => {
    if (isPreview) {
      Alert.alert(translate('easterEggs.tribute'))
    }
  }

  const getFromList = (list, where) => {
    return list.find(({ key }) => key === where)
  }

  return (
    <View style={styles.littenPostContainer}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.littenPost}>
        <SafeAreaView style={styles.littenPostGoBack}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Image
              source={iconGoBackArrow}
              style={styles.goBack}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
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
          </View>
          <View style={styles.littenPostContentSubHeader}>
            <Image
              source={getFromList(littenSpeciesList, litten.species)?.icon}
              resizeMode="contain"
              style={styles.littenPostContentSubHeaderIcon}
            />
            <UIHeader subheader>
              {getFromList(littenSpeciesList, litten.species)?.label}
            </UIHeader>
          </View>
          {litten?.location && (
            <View style={styles.littenPostContentSubHeader}>
              <Image
                source={typeFound}
                resizeMode="contain"
                style={styles.littenPostContentSubHeaderIcon}
              />
              <UIHeader subheader>
                {stringifyLocation(litten.location)}
              </UIHeader>
            </View>
          )}
          <UISeparator invisible />
          <UIText bold>{translate('screens.littenPost.story')}</UIText>
          <UIText>{litten.story}</UIText>
        </View>
      </ScrollView>
      <View style={styles.littenPostFooter}>
        <View style={styles.littenPostFooterUser}>
          <UIAvatar source={{ uri: user.avatar }} />
          <View style={styles.littenPostFooterUserInfo}>
            <UIText style={styles.littenPostFooterUserInfoText} bold>
              {user.name}
            </UIText>
            <UIText style={styles.littenPostFooterUserInfoText}>
              {dayjs(litten?.metadata?.creationTime).fromNow()}
            </UIText>
          </View>
        </View>
        {litten?.type && (
          <UIButton onPress={handleOnPress} compact>
            {getFromList(littenTypes, litten.type)?.label}
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
    backgroundColor: colors.darkBlue,
    tintColor: colors.lighterGray,
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
