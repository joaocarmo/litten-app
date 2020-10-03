/**
 * @format
 * @flow
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { iconGoBackArrow } from 'images'
import {
  STRUCTURE_GO_BACK_BUTTON_SIZE,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH,
} from 'utils/constants'
import colors from 'styles/colors'

const ScreenSimpleHeaderTemplate: (args: any) => React$Node = ({
  children,
  style,
  withGoBack = false,
}) => {
  const navigation = useNavigation()

  return (
    <View style={StyleSheet.compose(styles.header, style)}>
      {withGoBack && (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View
            style={typeof children === 'string' ? styles.goBackContainer : {}}>
            <Image
              source={iconGoBackArrow}
              style={styles.goBack}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      {typeof children === 'string' ? (
        <>
          <Text
            style={
              withGoBack
                ? StyleSheet.compose(
                    styles.headerText,
                    styles.headerTextCentered,
                  )
                : styles.headerText
            }>
            {children}
          </Text>
          {withGoBack && <View style={styles.pushRight} />}
        </>
      ) : (
        children
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM,
  },
  headerText: {
    flex: 8,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    color: colors.white,
  },
  headerTextCentered: {
    textAlign: 'center',
  },
  goBackContainer: {
    flex: 1,
  },
  goBack: {
    height: STRUCTURE_GO_BACK_BUTTON_SIZE,
    width: STRUCTURE_GO_BACK_BUTTON_SIZE,
  },
  pushRight: {
    flex: 1,
  },
})

export default ScreenSimpleHeaderTemplate
