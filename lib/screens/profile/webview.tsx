import { useCallback, useMemo, useRef, useState } from 'react'
import { Linking, StyleSheet, View } from 'react-native'
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

  const style = useMemo(
    () => [styles.container, withPaddingBottom],
    [withPaddingBottom],
  )

  const webviewRef = useRef(null)

  const params = useMemo(() => `?inapp=true&theme=${scheme}`, [scheme])
  const source = useMemo(
    () => ({ uri: `${WEB_APP_BASE}${path}${params}` }),
    [params, path],
  )
  const originWhitelist = useMemo(
    () => ['http://*', 'https://*', 'mailto:*'],
    [],
  )

  const stopLoading = useCallback(() => {
    setTimeout(() => setIsLoading(false), DEBOUNCE_TIMEOUT)
  }, [])

  const handleOnError = useCallback(() => {
    debugLog(`[WEBVIEW] WebView Error at ${path}.`)
    stopLoading()
    setShowError(true)
  }, [path, stopLoading])

  const handleOnHttpError = useCallback(
    (syntheticEvent) => {
      const { nativeEvent } = syntheticEvent

      debugLog(
        `[WEBVIEW] WebView HTTP Error at ${path} Status Code: `,
        nativeEvent.statusCode,
      )
      stopLoading()
      setShowError(true)
    },
    [path, stopLoading],
  )

  const handleExternalLink = useCallback(async (url) => {
    let supported = false

    try {
      supported = await Linking.canOpenURL(url)
    } catch (error) {
      debugLog(`[WEBVIEW] Could not determine if supported ${url}`)
    }

    if (supported) {
      try {
        await Linking.openURL(url)
      } catch (error) {
        debugLog(`[WEBVIEW] Could not open ${url}`)
      }
    } else {
      debugLog(`[WEBVIEW] External link not supported: ${url}`)
    }
  }, [])

  const handleOnNavigationStateChange = useCallback(
    (navState) => {
      const { url } = navState

      if (!url) {
        return
      }

      if (url.includes(WEB_APP_BASE)) {
        if (url.includes(params)) {
          return
        }

        // Append the params to the url
        const newURL = `${url}${params}`
        const redirectTo = `window.location = "${newURL}"`
        webviewRef.current.injectJavaScript(redirectTo)
      } else {
        // Don't load external links
        webviewRef.current.stopLoading()

        // Handle them natively
        handleExternalLink(url)
      }
    },
    [handleExternalLink, params],
  )

  return (
    <View style={style}>
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
          source={source}
          originWhitelist={originWhitelist}
          onError={handleOnError}
          onHttpError={handleOnHttpError}
          onLoadEnd={stopLoading}
          onNavigationStateChange={handleOnNavigationStateChange}
          ref={webviewRef}
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
