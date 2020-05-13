/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { UIImagePlaceholder, UIListItem, UIText } from 'ui-elements'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const bulletSize = 10

const ItemContent: () => React$Node = ({ children }) => (
  <View style={styles.textContainer}>
    <View style={styles.itemBullet} />
    <Text style={styles.itemText}>{children}</Text>
  </View>
)

const NewMainScreen: () => React$Node = () => (
  <View style={styles.container}>
    <UIText>{translate('screens.new.addPhotos')}</UIText>
    <UIImagePlaceholder.Group>
      {[...Array(8)].map((v, idx) => (
        <UIImagePlaceholder.Item key={idx} actionable={idx === 0} />
      ))}
    </UIImagePlaceholder.Group>
    <View style={styles.formContainer}>
      <UIListItem>
        <ItemContent>{translate('screens.new.addTitle')}</ItemContent>
      </UIListItem>
      <UIListItem hasExtra>
        <ItemContent>{translate('screens.new.addType')}</ItemContent>
      </UIListItem>
      <UIListItem>
        <ItemContent>{translate('screens.new.addStory')}</ItemContent>
      </UIListItem>
      <UIListItem hasExtra>
        <ItemContent>{translate('screens.new.addLocation')}</ItemContent>
      </UIListItem>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {},
  formContainer: {
    marginTop: 18,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemBullet: {
    height: bulletSize,
    width: bulletSize,
    borderRadius: bulletSize / 2,
    marginRight: 14,
    backgroundColor: colors.darkGray,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.blue,
  },
})

export default NewMainScreen
