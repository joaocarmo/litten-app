import { Pressable, View } from 'react-native'
import { useTheme } from '@hooks'
import UIText from '@ui-elements/text'
import type { UITextProps } from '@ui-elements/text'
import uiBalloonStyles from '@ui-elements/balloon/index.styles'

export interface UIBalloonProps extends UITextProps {
  type?: 'info' | 'success' | 'warning' | 'error'
}

const UIBalloon = ({
  children,
  style,
  type,
  ...otherProps
}: UIBalloonProps) => {
  const { onPress, onLongPress } = otherProps
  const { createStyles } = useTheme()
  const styles = createStyles(uiBalloonStyles)

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

UIBalloon.defaultProps = {
  type: '',
}

export default UIBalloon
