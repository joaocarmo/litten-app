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
import { vw } from 'react-native-expo-viewport-units'
import { iconGoBackArrow } from 'images'
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
    width: vw(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
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
    height: 24,
    width: 24,
  },
  pushRight: {
    flex: 1,
  },
})

export default ScreenSimpleHeaderTemplate
