/**
 * @format
 * @flow
 */

import { Switch, StyleSheet, Text, View } from 'react-native'
import colors from 'styles/colors'

const UISwitch: (args: any) => React$Node = ({
  children,
  onValueChange,
  style,
  value,
  ...otherProps
}) => (
  <View style={StyleSheet.compose(styles.uiSwitchContainer, style)}>
    <Text style={styles.uiSwitchText} numberOfLines={1}>
      {children}
    </Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={colors.white}
      trackColor={{ false: colors.iosLightGray, true: colors.purple }}
      {...otherProps}
    />
  </View>
)

const styles = StyleSheet.create({
  uiSwitchContainer: {
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
  uiSwitchText: {
    flex: 1,
    color: colors.black,
    fontSize: 16,
    fontWeight: '400',
  },
})

export default UISwitch
