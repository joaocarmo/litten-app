/**
 * @format
 * @flow
 */

import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { UIContainer, UIHeader, UILoader, UIText } from 'ui-elements'
import { WebView } from 'react-native-webview'
import { vh } from 'react-native-expo-viewport-units'
import { WEB_APP_BASE } from '@env'
import { logError } from 'utils/functions'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const WebViewScreen: () => React$Node = ({ path }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [showError, setShowError] = useState(false)

  const wbRef = useRef(null)

  const modifyContent = /*javascript*/ `
  (function() {
    document.body.style.backgroundColor = '${colors.lightGray}';
    var section = document.querySelector('#static-page');
    if (section) {
      section.style.padding = '20px';
      var title = document.querySelector('h1');
      if (title) {
        title.style.display = 'none';
      }
    }
  })();
  true;
`

  const injectJS = () => {
    if (wbRef?.current) {
      wbRef.current.injectJavaScript(modifyContent)
    }
  }

  const stopLoading = () => {
    setTimeout(() => setIsLoading(false), 500)
  }

  useEffect(() => {
    injectJS()
  })

  return (
    <View style={styles.container}>
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
          source={{ uri: `${WEB_APP_BASE}${path}` }}
          ref={wbRef}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent
            logError(`WebView Error at ${path}: `, nativeEvent)
            stopLoading()
            setShowError(true)
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent
            logError(
              `WebView HTTP Error at ${path} Status Code: `,
              nativeEvent.statusCode,
            )
            stopLoading()
            setShowError(true)
          }}
          onLoad={injectJS}
          onLoadEnd={stopLoading}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: vh(70),
    width: '100%',
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
