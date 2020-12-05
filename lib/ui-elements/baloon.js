/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import UIText from 'ui-elements/text'
import colors from 'styles/colors'

const UIBaloon: (args: any) => React$Node = ({
  children,
  style,
  type,
  ...otherProps
}) => {
  const getColorScheme = () => {
    switch (type) {
      case 'info':
        return {
          container: styles.uiBaloonInfo,
          text: styles.uiBaloonNormalInfo,
        }
      default:
        return {
          container: styles.uiBaloonNormal,
          text: styles.uiBaloonNormalText,
        }
    }
  }

  const baloonStyle = getColorScheme()

  return (
    <View style={[styles.uiBaloon, baloonStyle.container, style]}>
      {typeof children === 'string' ? (
        <UIText style={baloonStyle.text} {...otherProps}>
          {children}
        </UIText>
      ) : (
        children
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  uiBaloon: {
    padding: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  uiBaloonInfo: {
    borderColor: colors.lightBlue,
    backgroundColor: colors.lighterBlue,
  },
  uiBaloonNormalInfo: {
    color: colors.black,
  },
  uiBaloonNormal: {
    borderColor: colors.darkGray,
    backgroundColor: colors.lightGray,
  },
  uiBaloonNormalText: {
    color: colors.black,
  },
})

export default UIBaloon
