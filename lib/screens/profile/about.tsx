import { useState } from 'react'

import { Pressable, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@hooks'
import { UIBalloon, UIHeader, UISeparator, UIText } from '@ui-elements'
import { Litten as LittenLogo } from '@images/components/logo'
import { translate } from '@utils/i18n'
import { BUILD_TIME, IS_BETA_RELASE } from '@utils/env'
import {
  NUM_TAPS_FOR_SURPRISE,
  SCREEN_DEV_HACKS,
  STRUCTURE_TEMPLATE_SCREEN_PADDING,
  UI_ABOUT_LOGO_HEIGHT,
  UI_ABOUT_LOGO_WIDTH,
} from '@utils/constants'
import { author, contributors, license, version } from 'litten/package.json'

const authors = [
  author?.name,
  ...contributors.map((contributor) => contributor?.name),
]
  .filter((value) => !!value)
  .join(', ')

const ProfileAboutScreen = () => {
  const [aboutCounter, setAboutCounter] = useState(0)
  const navigation = useNavigation()
  const {
    theme: { colors },
  } = useTheme()

  const handleOnPressAbout = () => {
    const nextTick = aboutCounter + 1

    if (nextTick === NUM_TAPS_FOR_SURPRISE) {
      setAboutCounter(0)
      navigation.navigate(SCREEN_DEV_HACKS)
    } else {
      setAboutCounter(nextTick)
    }
  }

  return (
    <>
      <View style={styles.aboutLogoContainer}>
        <LittenLogo
          height={UI_ABOUT_LOGO_HEIGHT}
          width={UI_ABOUT_LOGO_WIDTH}
          fill={colors.secondary}
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
        <View style={styles.aboutAppInfo}>
          <Pressable onPress={handleOnPressAbout} style={styles.aboutVersion}>
            <UIHeader subheader>
              {translate('screens.profile.aboutVersion')}
            </UIHeader>
            <UIText>{version}</UIText>
          </Pressable>
          <UIHeader subheader>
            {translate('screens.profile.aboutBuildTime')}
          </UIHeader>
          <UIText>{`${BUILD_TIME}`}</UIText>
          <UIHeader subheader>
            {translate('screens.profile.aboutLicense')}
          </UIHeader>
          <UIText>{license}</UIText>
          <UIHeader subheader>
            {translate('screens.profile.aboutAuthors')}
          </UIHeader>
          <UIText centered>{authors}</UIText>
        </View>
      </View>
    </>
  )
}

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
  aboutAppInfo: {
    width: '100%',
    alignItems: 'center',
    paddingLeft: STRUCTURE_TEMPLATE_SCREEN_PADDING,
    paddingRight: STRUCTURE_TEMPLATE_SCREEN_PADDING,
  },
  aboutVersion: {
    width: '100%',
    alignItems: 'center',
  },
})
export default ProfileAboutScreen
