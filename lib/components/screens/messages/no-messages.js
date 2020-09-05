/**
 * @format
 * @flow
 */

import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UIContainer, UIHeader, UIText } from 'ui-elements'
import { translate } from 'utils/i18n'
import { placeholderEmptyMessages } from 'images'

const NoMessagesScreen: (args: any) => React$Node = () => (
  <View style={styles.emptyContainer}>
    <UIContainer style={styles.floatContainer}>
      <Image
        source={placeholderEmptyMessages}
        style={styles.placeholderImage}
        resizeMode="contain"
      />
      <UIHeader style={styles.centeredText}>
        {translate('screens.messages.emptyTitle')}
      </UIHeader>
      <UIText style={styles.centeredText}>
        {translate('screens.messages.emptyText')}
      </UIText>
    </UIContainer>
  </View>
)

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatContainer: {
    alignItems: 'center',
  },
  centeredText: {
    textAlign: 'center',
  },
  placeholderImage: {
    height: vw(30),
    width: vw(30),
    margin: 20,
  },
})

export default NoMessagesScreen
