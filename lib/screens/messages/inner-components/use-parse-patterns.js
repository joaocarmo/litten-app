/**
 * @format
 * @flow
 */

import { Alert, StyleSheet } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { openURL } from 'utils/ui'
import { MAILTO_URI, SMS_URI, TEL_URI } from 'utils/constants'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

type LinkStyle = $FlowFixMe
type ParseShape = $FlowFixMe

const useParsePatterns = () => {
  const { showActionSheetWithOptions } = useActionSheet()

  const handleUrlPress = (url) => openURL(url)

  const handlePhonePress = (phoneNumber) => {
    const options = [
      translate('screens.settings.contactCall'),
      translate('screens.settings.contactSMS'),
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
          openURL(`${TEL_URI}${phoneNumber}`)
        } else if (buttonIndex === 1) {
          openURL(`${SMS_URI}${phoneNumber}`)
        }
      },
    )
  }

  const handleEmailPress = (email) => openURL(`${MAILTO_URI}${email}`)

  const handleHashtagPress = () =>
    Alert.alert(translate('feedback.errorMessages.notImplemented'))

  const parsePatterns = (linkStyle: LinkStyle): ParseShape[] => [
    {
      type: 'url',
      style: [linkStyle, styles.link],
      onPress: handleUrlPress,
    },
    {
      type: 'phone',
      style: [linkStyle, styles.link],
      onPress: handlePhonePress,
    },
    {
      type: 'email',
      style: [linkStyle, styles.link],
      onPress: handleEmailPress,
    },
    {
      pattern: /#(\w+)/,
      style: [linkStyle, styles.clickable],
      onPress: handleHashtagPress,
    },
  ]

  return parsePatterns
}

const styles = StyleSheet.create({
  link: {
    fontWeight: '400',
    color: colors.blue,
    textDecorationLine: 'underline',
  },
  clickable: {
    fontWeight: '400',
    color: colors.blue,
    textDecorationLine: 'none',
  },
})

export default useParsePatterns
