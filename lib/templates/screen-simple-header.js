/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import GoBack from 'components/go-back'
import {
  STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH,
} from 'utils/constants'
import colors from 'styles/colors'
import { fontSize, fontWeight } from 'styles/typography'

const ScreenSimpleHeaderTemplate: (args: any) => Node = ({
  children,
  style,
  withGoBack = false,
}) => {
  const notAndroid = Platform.OS !== 'android'
  const childrenIsText = typeof children === 'string'

  return (
    <View style={[styles.headerContainer, style]}>
      {notAndroid && withGoBack && <GoBack />}
      <View style={styles.headerContentContainer}>
        {childrenIsText ? (
          <Text
            numberOfLines={1}
            style={[
              styles.headerText,
              withGoBack ? styles.headerTextCentered : undefined,
            ]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
      {notAndroid && childrenIsText && withGoBack && <GoBack filler />}
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: '100%',
    width: STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM,
  },
  headerContentContainer: {
    flex: 1,
    flexGrow: 16,
  },
  headerText: {
    fontSize: fontSize.xxlarge,
    fontWeight: fontWeight.bolder,
    textAlign: 'left',
    color: colors.white,
  },
  headerTextCentered: {
    textAlign: 'center',
  },
})

export default ScreenSimpleHeaderTemplate
