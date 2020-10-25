/**
 * @format
 * @flow
 */

import { Platform, View } from 'react-native'
import { UIHeader, UIText } from 'ui-elements'
import { translate } from 'utils/i18n'
import { author, contributors, license, version } from 'litten/package.json'

const authors = [
  author?.name,
  ...contributors.map((contributor) => contributor?.name),
]
  .filter((value) => !!value)
  .join(', ')

const ProfileAboutScreen: (args: any) => React$Node = () => (
  <View>
    <UIHeader subheader>{translate('screens.profile.aboutVersion')}</UIHeader>
    <UIText>{version}</UIText>
    <UIHeader subheader>{translate('screens.profile.aboutLicense')}</UIHeader>
    <UIText>{license}</UIText>
    <UIHeader subheader>{translate('screens.profile.aboutAuthors')}</UIHeader>
    <UIText>{authors}</UIText>
    <UIHeader subheader>
      {translate('screens.profile.aboutEnvironment')}
    </UIHeader>
    <UIText>{process.env.NODE_ENV || 'unkown'}</UIText>
    <UIHeader subheader>{translate('screens.profile.aboutOS')}</UIHeader>
    <UIText>{Platform.OS}</UIText>
    <UIHeader subheader>{translate('screens.profile.aboutOSVersion')}</UIHeader>
    <UIText>{Platform.Version}</UIText>
  </View>
)

export default ProfileAboutScreen
