/**
 * @format
 * @flow
 */

import { useNavigation } from '@react-navigation/native'
import {
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { vh, vw } from 'react-native-expo-viewport-units'
import { iconGoBackArrow } from 'images'
import colors from 'styles/colors'

const RegisterLoginTemplate: (args: any) => React$Node = ({
  children,
  footer,
  header,
}) => {
  const navigation = useNavigation()

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.goBackContainer}>
            <Image
              source={iconGoBackArrow}
              style={styles.goBack}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.formOutContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formInContainer}>
            <View style={styles.formHeader}>
              <Text style={styles.headerText}>{header}</Text>
            </View>
            <View style={styles.formBody}>{children}</View>
            <View style={styles.formFooter}>{footer}</View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    height: vh((1 / 7) * 100),
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: colors.blue,
  },
  formOutContainer: {
    height: vh((6 / 7) * 100),
    backgroundColor: colors.blue,
  },
  formInContainer: {
    height: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formHeader: {
    flex: 1,
    width: vw(90),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  formBody: {
    flex: 3,
    width: vw(90),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  formFooter: {
    flex: 1,
    width: vw(90),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  goBackContainer: {
    padding: 20,
  },
  goBack: {
    height: 24,
    width: 24,
  },
  headerText: {
    fontSize: 32,
    color: colors.black,
  },
})

export default RegisterLoginTemplate
