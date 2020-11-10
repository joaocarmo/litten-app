/**
 * @format
 * @flow
 */

import { useState } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { UIButton, UIHeader, UISeparator, UIText } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { translate } from 'utils/i18n'
import { clearStorage } from 'store'

const HacksUI: (args: any) => React$Node = ({ type }) => {
  const [storageCleared, setCtorageCleared] = useState(false)

  const handleClearStorage = async () => {
    const hasStorageCleared = await clearStorage()
    setCtorageCleared(hasStorageCleared)
  }

  return (
    <ScreenTemplate
      header={
        <ScreenSimpleHeaderTemplate withGoBack>
          {translate('screens.dev.hacks')}
        </ScreenSimpleHeaderTemplate>
      }>
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
