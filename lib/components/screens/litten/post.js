/**
 * @format
 * @flow
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { vh } from 'react-native-expo-viewport-units'
import { UIText } from 'ui-elements'
import { iconGoBackArrow } from 'images'
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
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const placeholder = { uri: 'https://placeimg.com/800/800/any' }

const LittenPostScreen: (args: any) => React$Node = ({ route }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.littenPostContainer}>
      <Image source={placeholder} style={styles.mainImage} resizeMode="cover" />
      <ScrollView style={styles.littenPost}>
        <SafeAreaView style={styles.littenPostGoBack}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Image
              source={iconGoBackArrow}
              style={styles.goBack}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        </SafeAreaView>
        <View style={styles.littenPostContent}>
          <UIText>{'Bottom'}</UIText>
          <UIText>{route?.params?.preview ? 'Preview' : 'Real'}</UIText>
          {[...Array(40)].map((v, i) => (
            <UIText key={i}>{'Bottom'}</UIText>
          ))}
        </View>
      </ScrollView>
      <View style={styles.littenPostFooter}>
        <UIText>{'Footer'}</UIText>
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
    tintColor: colors.darkGray,
  },
  mainImage: {
    width: '100%',
    height: vh(STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO * 100) * 1.1,
    position: 'absolute',
    top: 0,
  },
  littenPostContent: {
    minHeight: vh((1 - STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO) * 100),
    marginTop: vh(STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO * 100),
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT * 1.2,
    borderTopLeftRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
    borderTopRightRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
    backgroundColor: colors.lightGray,
  },
  littenPostFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    height: STRUCTURE_TAB_NAV_HEIGHT,
    width: '100%',
    borderTopLeftRadius: STRUCTURE_TAB_NAV_BORDER_RADIUS,
    borderTopRightRadius: STRUCTURE_TAB_NAV_BORDER_RADIUS,
    backgroundColor: colors.white,
    zIndex: 1,
  },
})

export default LittenPostScreen
