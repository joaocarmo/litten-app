import { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { usePaddingBottom, useTheme } from '@hooks'
import { UIContainer, UIHeader, UILoader, UIText } from '@ui-elements'
import { WebView } from 'react-native-webview'
import { debugLog } from '@utils/dev'
import {
  DEBOUNCE_TIMEOUT,
  STRUCTURE_TAB_NAV_HEIGHT,
  WEB_APP_BASE,
} from '@utils/constants'
import { translate } from '@utils/i18n'

const WebViewScreen = ({ path }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [showError, setShowError] = useState(false)
  const { scheme } = useTheme()
  const withPaddingBottom = usePaddingBottom(0.85)

  const params = useMemo(() => `?inapp=true&theme=${scheme}`, [scheme])

  const stopLoading = () => {
    setTimeout(() => setIsLoading(false), DEBOUNCE_TIMEOUT)
  }

  return (
    <View style={[styles.container, withPaddingBottom]}>
      <UILoader active={isLoading} />
      {showError && (
        <View style={styles.centeredContainer}>
          <UIContainer>
            <UIHeader style={styles.centeredText}>
              {translate('feedback.errorMessages.checkConnectionTitle')}
            </UIHeader>
            <UIText style={styles.centeredText}>
              {translate('feedback.errorMessages.checkConnectionText')}
            </UIText>
          </UIContainer>
        </View>
      )}
      {!showError && (
        <WebView
          source={{
            uri: `${WEB_APP_BASE}${path}${params}`,
          }}
          onError={() => {
            debugLog(`[WEBVIEW] WebView Error at ${path}.`)
            stopLoading()
            setShowError(true)
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent
            debugLog(
              `[WEBVIEW] WebView HTTP Error at ${path} Status Code: `,
              nativeEvent.statusCode,
            )
            stopLoading()
            setShowError(true)
          }}
          onLoadEnd={stopLoading}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredText: {
    textAlign: 'center',
  },
})

export default WebViewScreen
