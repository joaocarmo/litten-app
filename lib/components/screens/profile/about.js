/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { UIText } from 'ui-elements'
import { translate } from 'utils/i18n'
import { version } from 'litten/package.json'

const ProfileAboutScreen: () => React$Node = () => (
  <View style={styles.container}>
    <UIText>{`${translate('screens.profile.aboutVersion')} ${version}`}</UIText>
    <UIText>
      {`${translate('screens.profile.buildEnvironment')} ${
        process.env.NODE_ENV
      }`}
    </UIText>
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingBottom: 300,
  },
})

export default ProfileAboutScreen
