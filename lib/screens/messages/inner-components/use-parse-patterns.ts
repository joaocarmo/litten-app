import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useSearchQuery, useTheme } from '@hooks'
import { openURL } from '@utils/ui'
import { MAILTO_URI, SMS_URI, TEL_URI, Routes } from '@utils/constants'
import { translate } from '@utils/i18n'
import { TextStyle } from 'react-native'
import type { ParseShape } from 'react-native-parsed-text'
import type { UseParsePatternsNavigationProp } from '@utils/types/routes'

const useParsePatterns = () => {
  const [, setQuery] = useSearchQuery()
  const navigation = useNavigation<UseParsePatternsNavigationProp>()
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
      navigation.navigate(Routes.SCREEN_TAB_NAV_INDEX, {
        screen: Routes.SCREEN_TAB_NAV_HOME,
        initial: false,
      })
    },
    [navigation, setQuery],
  )

  const parsePatterns = useCallback(
    (linkStyle: TextStyle): ParseShape[] => [
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
