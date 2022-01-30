import { useCallback, useState } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'
import { useActionSheet } from '@expo/react-native-action-sheet'
import FastImage from 'react-native-fast-image'
import { useLittenTeam, useNotifications } from '@hooks'
import crashlytics from '@db/crashlytics'
import { simulateNetwork } from '@db/firestore'
import { UIButton, UIHeader, UISeparator, UIText } from '@ui-elements'
import ScreenTemplate from '@templates/screen'
import ScreenSimpleHeaderTemplate from '@templates/screen-simple-header'
import { translate } from '@utils/i18n'
import { clearStorage } from '@store/utils'
import { debugLog } from '@utils/dev'

const [getState, toggleState] = simulateNetwork()

const HacksUI = () => {
  const [storageCleared, setStorageCleared] = useState(false)
  const [cacheCleared, setCacheCleared] = useState(false)
  const [useCrashTestDummy, setUseCrashTestDummy] = useState(false)
  const [fbNetworkActive, setFbNetworkActive] = useState(getState())
  const actionsAreAllowed = useLittenTeam()
  const notifications = useNotifications()
  const { isConnected: networkActive } = useNetInfo()
  const { showActionSheetWithOptions } = useActionSheet()

  const triggerLocalNotification = () => {
    notifications.localNotification(
      translate('easterEggs.obiWan'),
      translate('easterEggs.obiWanHello'),
      {
        userInfo: {
          key: 'value',
        },
      },
    )
  }

  const toggleFbNetwork = useCallback(async () => {
    await toggleState()
    setFbNetworkActive(getState())
  }, [])

  const handleClearStorage = useCallback(async () => {
    const hasStorageCleared = await clearStorage()
    setStorageCleared(hasStorageCleared)
  }, [])

  const handleClearCache = useCallback(async () => {
    try {
      await FastImage.clearMemoryCache()
      await FastImage.clearDiskCache()
      setCacheCleared(true)
    } catch (err) {
      debugLog(err)
    }
  }, [])

  const handleAbruptChaos = useCallback(() => {
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
  }, [showActionSheetWithOptions])

  const renderCrashTestDummy = useCallback(() => {
    if (useCrashTestDummy) {
      return 'Crash Test Dummy'
    }

    return null
  }, [useCrashTestDummy])

  return (
    <ScreenTemplate
      header={
        <ScreenSimpleHeaderTemplate withGoBack>
          {translate('screens.dev.hacks')}
        </ScreenSimpleHeaderTemplate>
      }
      scrollable
    >
      <View style={styles.devActions}>
        <UIHeader subheader>
          {translate('screens.dev.aboutEnvironment')}
        </UIHeader>
        <UIText>{process.env.NODE_ENV || 'unkown'}</UIText>
        <UIHeader subheader>{translate('screens.dev.aboutOSVersion')}</UIHeader>
        <UIText>{`${Platform.OS} ${Platform.Version}`}</UIText>
        <UIHeader subheader>{translate('screens.dev.network')}</UIHeader>
        <UIText>
          {networkActive ? translate('cta.active') : translate('cta.inactive')}
        </UIText>
        <UIHeader subheader>
          {translate('screens.dev.firestoreNetwork')}
        </UIHeader>
        <UIText>
          {fbNetworkActive
            ? translate('cta.active')
            : translate('cta.inactive')}
        </UIText>
        {actionsAreAllowed && (
          <>
            <UISeparator invisible />
            <UIButton onPress={triggerLocalNotification} secondary>
              {translate('screens.dev.triggerLocalNotification')}
            </UIButton>
            <UISeparator invisible small />
            <UIButton onPress={toggleFbNetwork} secondary>
              {translate('screens.dev.toggleFirebaseNetwork')}
            </UIButton>
            <UISeparator invisible small />
            <UIButton
              onPress={handleClearStorage}
              disabled={storageCleared}
              danger
            >
              {translate('screens.dev.clearAsyncStorage')}
            </UIButton>
            <UISeparator invisible small />
            <UIButton onPress={handleClearCache} disabled={cacheCleared} danger>
              {translate('screens.dev.clearImageCache')}
            </UIButton>
            <UISeparator invisible small />
            <UIButton onPress={handleAbruptChaos} danger>
              {translate('screens.dev.abruptChaos')}
            </UIButton>
          </>
        )}
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
