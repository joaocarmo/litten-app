/**
 * @format
 * @flow
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { UIButton } from 'ui-elements'
import { vh } from 'react-native-expo-viewport-units'
import { translate } from 'utils/i18n'

const NewLocationManualForm: (args: any) => React$Node = ({ setFormType }) => {
  const chooseLocation = () => {
    console.warn('howdy')
  }

  return (
    <View style={styles.manualContainer}>
      <View style={styles.placeholder} />
      <View style={styles.extraContainer}>
        <UIButton onPress={() => setFormType('map')} secondary>
          {translate('screens.new.useMapLocation')}
        </UIButton>
      </View>
      <View style={styles.extraContainer}>
        <UIButton onPress={chooseLocation}>{translate('cta.done')}</UIButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  manualContainer: {
    flex: 1,
  },
  placeholder: {
    height: vh(50),
  },
  extraContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 14,
  },
})

export default NewLocationManualForm
