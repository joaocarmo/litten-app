/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { UILink } from 'ui-elements'

const CreateNewCTA: () => React$Node = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.cta}>
      <Text>New user? </Text>
      <UILink onPress={() => navigation.navigate('Register')}>Sign up</UILink>
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
