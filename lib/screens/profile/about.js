/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import { UIBalloon, UIHeader, UISeparator, UIText } from 'ui-elements'
import { Litten as LittenLogo } from 'images/components/logo'
import { translate } from 'utils/i18n'
import { BUILD_TIME, IS_BETA_RELASE } from 'utils/env'
import { UI_ABOUT_LOGO_HEIGHT, UI_ABOUT_LOGO_WIDTH } from 'utils/constants'
import colors from 'styles/colors'
import { author, contributors, license, version } from 'litten/package.json'

const authors = [
  author?.name,
  ...contributors.map((contributor) => contributor?.name),
]
  .filter((value) => !!value)
  .join(', ')

const ProfileAboutScreen: (args: any) => React$Node = () => (
  <>
    <View style={styles.aboutLogoContainer}>
      <LittenLogo
        height={UI_ABOUT_LOGO_HEIGHT}
        width={UI_ABOUT_LOGO_WIDTH}
        fill={colors.blue}
      />
    </View>
    <View style={styles.aboutContentContainer}>
      {IS_BETA_RELASE && (
        <>
          <UIHeader subheader>
            {translate('screens.profile.aboutBetaReleaseTitle')}
          </UIHeader>
          <UISeparator invisible small />
          <UIBalloon type="info">
            {translate('screens.profile.aboutBetaRelease')}
          </UIBalloon>
          <UISeparator invisible small />
        </>
      )}
      <UIHeader subheader>{translate('screens.profile.aboutVersion')}</UIHeader>
      <UIText>{version}</UIText>
      <UIHeader subheader>
        {translate('screens.profile.aboutBuildTime')}
      </UIHeader>
      <UIText>{`${BUILD_TIME}`}</UIText>
      <UIHeader subheader>{translate('screens.profile.aboutLicense')}</UIHeader>
      <UIText>{license}</UIText>
      <UIHeader subheader>{translate('screens.profile.aboutAuthors')}</UIHeader>
      <UIText>{authors}</UIText>
    </View>
  </>
)

const styles = StyleSheet.create({
  aboutLogoContainer: {
    maxHeight: UI_ABOUT_LOGO_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
  aboutContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})

export default ProfileAboutScreen
