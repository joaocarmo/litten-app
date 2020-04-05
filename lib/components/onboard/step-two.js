/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native'

const StepTwo: () => React$Node = ({ navigation }) => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Step Two</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
)

export default StepTwo
