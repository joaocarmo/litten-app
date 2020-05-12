/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { UIImagePlaceholder, UIListItem, UIText } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { translate } from 'utils/i18n'

const NewScreen: () => React$Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate>
        {translate('screens.new.title')}
      </ScreenSimpleHeaderTemplate>
    }>
    <View style={styles.container}>
      <UIText>{translate('screens.new.addPhotos')}</UIText>
      <UIImagePlaceholder.Group>
        {[...Array(8)].map((v, idx) => (
          <UIImagePlaceholder.Item actionable={idx === 0} />
        ))}
      </UIImagePlaceholder.Group>
      <View style={styles.formContainer}>
        <UIListItem>Add title</UIListItem>
      </View>
    </View>
  </ScreenTemplate>
)

const styles = StyleSheet.create({
  container: {},
  formContainer: {
    marginTop: 14,
  },
})

export default NewScreen
