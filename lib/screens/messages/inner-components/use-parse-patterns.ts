import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useSearchQuery, useTheme } from '@hooks'
import { openURL } from '@utils/ui'
import {
  MAILTO_URI,
  SCREEN_TAB_NAV_HOME,
  SMS_URI,
  TEL_URI,
} from '@utils/constants'
import { translate } from '@utils/i18n'

type LinkStyle = any
type ParseShape = any

const useParsePatterns = (): ((linkStyle: LinkStyle) => Array<ParseShape>) => {
  const [, setQuery] = useSearchQuery()
  const navigation = useNavigation()
  const { showActionSheetWithOptions } = useActionSheet()
  const { createStyles } = useTheme()
  const styles = createStyles((theme, typography) => ({
    link: {
      fontWeight: typography.fontWeight.light,
      color: theme.colors.secondary,
      textDecorationLine: 'underline',
    },
    clickable: {
      fontWeight: typography.fontWeight.light,
      color: theme.colors.secondary,
      textDecorationLine: 'none',
    },
  }))
  const handleUrlPress = useCallback((url) => openURL(url), [])
  const handlePhonePress = useCallback(
    (phoneNumber) => {
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
    },
    [showActionSheetWithOptions],
  )
  const handleEmailPress = useCallback(
    (email) => openURL(`${MAILTO_URI}${email}`),
    [],
  )
  const handleHashtagPress = useCallback(
    (hastag) => {
      setQuery(hastag)
      navigation.navigate(SCREEN_TAB_NAV_HOME, {
        screen: SCREEN_TAB_NAV_HOME,
        initial: false,
      })
    },
    [navigation, setQuery],
  )
  const parsePatterns = useCallback(
    (linkStyle: LinkStyle): ParseShape[] => [
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
    ],
    [
      handleEmailPress,
      handleHashtagPress,
      handlePhonePress,
      handleUrlPress,
      styles.clickable,
      styles.link,
    ],
  )
  return parsePatterns
}

export default useParsePatterns
