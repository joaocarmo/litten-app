/**
 * @format
 * @flow
 */

import { Pressable, StyleSheet, Text, View } from 'react-native'
import colors from 'styles/colors'

const UISetting: (args: any) => React$Node = ({
  children,
  label,
  onPress,
  ...otherProps
}) => {
  const content = (
    <>
      <Text style={styles.uiSettingText} numberOfLines={1}>
        {label}
      </Text>
      {children}
    </>
  )

  if (typeof onPress === 'function') {
    return (
      <Pressable
        onPress={onPress}
        style={styles.uiSettingContainer}
        {...otherProps}>
        {content}
      </Pressable>
    )
  }

  return (
    <View style={styles.uiSettingContainer} {...otherProps}>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  uiSettingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 12,
  },
  uiSettingText: {
    flex: 1,
    color: colors.black,
    fontSize: 16,
    fontWeight: '400',
  },
})

export default UISetting
