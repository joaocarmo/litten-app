/**
 * @format
 * @flow
 */

import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { UILink } from 'ui-elements'
import { translate } from 'utils/i18n'
import {
  SCREEN_NOAUTH_LOGIN,
  UI_SCREEN_NOAUTH_CTA_HEIGHT,
} from 'utils/constants'

const SignInCTA: () => React$Node = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.cta}>
      <Text>{translate('welcome.hasAccount')} </Text>
      <UILink onPress={() => navigation.navigate(SCREEN_NOAUTH_LOGIN)}>
        {translate('cta.signIn')}
      </UILink>
    </View>
  )
}

const styles = StyleSheet.create({
  cta: {
    height: UI_SCREEN_NOAUTH_CTA_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: UI_SCREEN_NOAUTH_CTA_HEIGHT,
  },
})

export default SignInCTA
