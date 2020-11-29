/**
 * @format
 * @flow
 */

import { useNavigation } from '@react-navigation/native'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { Left as LeftArrow } from 'images/components/arrows'
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

  const notAndroid = Platform.OS !== 'android'
  const childrenIsText = typeof children === 'string'

  return (
    <View style={[styles.headerContainer, style]}>
      {notAndroid && withGoBack && (
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.goBackContainer}>
          <LeftArrow
            width={STRUCTURE_GO_BACK_BUTTON_SIZE}
            height={STRUCTURE_GO_BACK_BUTTON_SIZE}
            fill={colors.white}
          />
        </Pressable>
      )}
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
      {notAndroid && childrenIsText && withGoBack && (
        <View style={styles.pushRight} />
      )}
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
  pushRight: {
    flex: 1,
  },
})

export default ScreenSimpleHeaderTemplate
