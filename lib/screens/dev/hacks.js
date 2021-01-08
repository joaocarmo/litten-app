/**
 * @format
 * @flow
 */

import { useState } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import crashlytics from 'db/crashlytics'
import { UIButton, UIHeader, UISeparator, UIText } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { translate } from 'utils/i18n'
import { clearStorage } from 'store/utils'

const HacksUI: (args: any) => React$Node = ({ type }) => {
  const [storageCleared, setStorageCleared] = useState(false)
  const [useCrashTestDummy, setUseCrashTestDummy] = useState(false)

  const { showActionSheetWithOptions } = useActionSheet()

  const handleClearStorage = async () => {
    const hasStorageCleared = await clearStorage()
    setStorageCleared(hasStorageCleared)
  }

  const handleAbruptChaos = () => {
    const options = [
      translate('screens.dev.abruptChaosNative'),
      translate('screens.dev.abruptChaosJS'),
      translate('screens.dev.abruptChaosReact'),
      translate('cta.cancel'),
    ]
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: null,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          crashlytics.crash()
        } else if (buttonIndex === 1) {
          throw new Error('[DEV] JavaScript invoked crash')
        } else if (buttonIndex === 2) {
          setUseCrashTestDummy(true)
        }
      },
    )
  }

  const renderCrashTestDummy = () => {
    if (useCrashTestDummy) {
      return 'Crash Test Dummy'
    }

    return null
  }

  return (
    <ScreenTemplate
      header={
        <ScreenSimpleHeaderTemplate withGoBack>
          {translate('screens.dev.hacks')}
        </ScreenSimpleHeaderTemplate>
      }
      scrollable>
      <UIText>{translate('screens.dev.hacksIntro')}</UIText>
      <UISeparator invisible />
      <View style={styles.devActions}>
        <UIHeader subheader>
          {translate('screens.dev.aboutEnvironment')}
        </UIHeader>
        <UIText>{process.env.NODE_ENV || 'unkown'}</UIText>
        <UIHeader subheader>{translate('screens.dev.aboutOS')}</UIHeader>
        <UIText>{Platform.OS}</UIText>
        <UIHeader subheader>{translate('screens.dev.aboutOSVersion')}</UIHeader>
        <UIText>{Platform.Version}</UIText>
        <UISeparator invisible />
        <UIButton onPress={handleClearStorage} disabled={storageCleared} danger>
          {translate('screens.dev.clearAsyncStorage')}
        </UIButton>
        <UISeparator invisible small />
        <UIButton onPress={handleAbruptChaos} danger>
          {translate('screens.dev.abruptChaos')}
        </UIButton>
        {renderCrashTestDummy()}
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  devActions: {
    alignItems: 'center',
  },
})

export default HacksUI
