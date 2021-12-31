import { Pressable, StyleSheet, View } from 'react-native'
import { useTheme } from 'hooks'
import UIText from 'ui-elements/text'

const UIBalloon = ({ children, style, type, ...otherProps }) => {
  const { createStyles } = useTheme()
  const { onPress, onLongPress } = otherProps
  const styles = createStyles((theme, typography) => ({
    uiBalloon: {
      padding: 12,
      borderRadius: 12,
      borderWidth: StyleSheet.hairlineWidth,
    },
    uiBalloonError: {
      borderColor: theme.colors.dangerDark,
      backgroundColor: theme.colors.dangerLight,
    },
    uiBalloonNormalError: {
      color: theme.colors.dangerDark,
    },
    uiBalloonInfo: {
      borderColor: theme.colors.secondaryLight,
      backgroundColor: theme.colors.secondaryLighter,
    },
    uiBalloonNormalInfo: {
      color: theme.colors.neutralDark,
    },
    uiBalloonNormal: {
      borderColor: theme.colors.neutralDark,
      backgroundColor: theme.colors.neutralLight,
    },
    uiBalloonNormalText: {
      color: theme.colors.text,
    },
    uiBalloonText: {
      fontWeight: typography.fontWeight.light,
    },
  }))

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
          {...otherProps}
        >
          {children}
        </UIText>
      ) : (
        children
      )}
    </Container>
  )
}

export default UIBalloon
