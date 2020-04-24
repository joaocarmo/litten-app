/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { translate } from 'utils/i18n'
import { UILink } from 'ui-elements'

const SignInCTA: () => React$Node = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.cta}>
      <Text>{translate('welcome.hasAccount')} </Text>
      <UILink onPress={() => navigation.navigate('Login')}>
        {translate('cta.signIn')}
      </UILink>
    </View>
  )
}

const styles = StyleSheet.create({
  cta: {
    flexDirection: 'row',
    marginTop: 24,
  },
})

export default SignInCTA
