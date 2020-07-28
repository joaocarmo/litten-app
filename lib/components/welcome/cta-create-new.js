/**
 * @format
 * @flow
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { translate } from 'utils/i18n'
import { UILink } from 'ui-elements'
import { SCREEN_NOAUTH_REGISTER } from 'utils/constants'

const CreateNewCTA: () => React$Node = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.cta}>
      <Text>{translate('welcome.newAccount')} </Text>
      <UILink onPress={() => navigation.navigate(SCREEN_NOAUTH_REGISTER)}>
        {translate('cta.signUp')}
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

export default CreateNewCTA
