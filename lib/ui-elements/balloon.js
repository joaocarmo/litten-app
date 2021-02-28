/**
 * @format
 * @flow
 */

import { Pressable, StyleSheet, View } from 'react-native'
import UIText from 'ui-elements/text'
import colors from 'styles/colors'
import { fontWeight } from 'styles/typography'

const UIBalloon: (args: any) => React$Node = ({
  children,
  style,
  type,
  ...otherProps
}) => {
  const { onPress, onLongPress } = otherProps

  const getColorScheme = () => {
    switch (type) {
      case 'error':
        return {
          container: styles.uiBalloonError,
          text: styles.uiBalloonNormalError,
        }
      case 'info':
        return {
          container: styles.uiBalloonInfo,
          text: styles.uiBalloonNormalInfo,
        }
      default:
        return {
          container: styles.uiBalloonNormal,
          text: styles.uiBalloonNormalText,
        }
    }
  }

  const baloonStyle = getColorScheme()

  const Container =
    typeof onPress === 'function' || typeof onLongPress === 'function'
      ? Pressable
      : View

  return (
    <Container style={[styles.uiBalloon, baloonStyle.container, style]}>
      {typeof children === 'string' ? (
        <UIText
          style={[styles.uiBalloonText, baloonStyle.text]}
          {...otherProps}>
          {children}
        </UIText>
      ) : (
        children
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  uiBalloon: {
    padding: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  uiBalloonError: {
    borderColor: colors.darkRed,
    backgroundColor: colors.lightRed,
  },
  uiBalloonNormalError: {
    color: colors.darkRed,
  },
  uiBalloonInfo: {
    borderColor: colors.lightBlue,
    backgroundColor: colors.lighterBlue,
  },
  uiBalloonNormalInfo: {
    color: colors.black,
  },
  uiBalloonNormal: {
    borderColor: colors.darkGray,
    backgroundColor: colors.lightGray,
  },
  uiBalloonNormalText: {
    color: colors.black,
  },
  uiBalloonText: {
    fontWeight: fontWeight.light,
  },
})

export default UIBalloon
