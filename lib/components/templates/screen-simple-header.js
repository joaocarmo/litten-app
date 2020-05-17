/**
 * @format
 * @flow strict-local
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

const ScreenSimpleHeaderTemplate: () => React$Node = ({
  children,
  withGoBack = false,
}) => {
  const navigation = useNavigation()

  return (
    <View style={styles.header}>
      {withGoBack && (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.goBackContainer}>
            <Image
              source={iconGoBackArrow}
              style={styles.goBack}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      <Text style={styles.headerText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: vw(85),
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'flex-end',
    paddingBottom: 24,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  goBackContainer: {
    marginRight: 20,
  },
  goBack: {
    height: 24,
    width: 24,
  },
})

export default ScreenSimpleHeaderTemplate
