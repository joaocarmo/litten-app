/**
 * @format
 * @flow
 */

import React from 'react'
import { Platform, View } from 'react-native'
import { UIText } from 'ui-elements'
import { translate } from 'utils/i18n'
import { author, contributors, license, version } from 'litten/package.json'

const authors = [
  author?.name,
  ...contributors.map((contributor) => contributor?.name),
]
  .filter((value) => !!value)
  .join(', ')

const ProfileAboutScreen: () => React$Node = () => (
  <View>
    <UIText>{`${translate('screens.profile.aboutVersion')} ${version}`}</UIText>
    <UIText>{`${translate('screens.profile.aboutLicense')} ${license}`}</UIText>
    <UIText>{`${translate('screens.profile.aboutAuthors')} ${authors}`}</UIText>
    <UIText>
      {`${translate('screens.profile.aboutEnvironment')} ${
        process.env.NODE_ENV
      }`}
    </UIText>
    <UIText>{`${translate('screens.profile.aboutOS')} ${Platform.OS}`}</UIText>
    <UIText>{`${translate('screens.profile.aboutOSVersion')} ${
      Platform.Version
    }`}</UIText>
  </View>
)

export default ProfileAboutScreen
