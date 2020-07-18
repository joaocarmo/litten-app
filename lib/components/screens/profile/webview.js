/**
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { UILoader } from 'ui-elements'
import { WebView } from 'react-native-webview'
import { vh } from 'react-native-expo-viewport-units'
import { WEB_APP_BASE } from '@env'
import { logError } from 'utils/functions'
import colors from 'styles/colors'

const WebViewScreen: () => React$Node = ({ path }) => {
  const [isLoading, setIsLoading] = useState(true)

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
    wbRef.current.injectJavaScript(modifyContent)
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
      <WebView
        source={{ uri: `${WEB_APP_BASE}${path}` }}
        ref={wbRef}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent
          logError(`WebView Error at ${path}: `, nativeEvent)
          stopLoading()
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent
          logError(
            `WebView HTTP Error at ${path} Status Code: `,
            nativeEvent.statusCode,
          )
          stopLoading()
        }}
        onLoad={injectJS}
        onLoadEnd={stopLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: vh(70),
    width: '100%',
  },
})

export default WebViewScreen
