/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native'

const StepThree: () => React$Node = ({ navigation }) => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Step Three</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
)

export default StepThree
