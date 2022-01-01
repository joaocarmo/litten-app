import { Platform, Text, View } from 'react-native'
import { useTheme } from '@hooks'
import GoBack from '@components/go-back'
import {
  STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH,
} from '@utils/constants'

const ScreenSimpleHeaderTemplate = ({
  children,
  style,
  withGoBack = false,
}) => {
  const { createStyles } = useTheme()

  const styles = createStyles((theme, typography) => ({
    headerContainer: {
      height: '100%',
      width: STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM,
    },
    headerContentContainer: {
      flex: 1,
      flexGrow: 16,
    },
    headerText: {
      fontSize: typography.fontSize.xxlarge,
      fontWeight: typography.fontWeight.bolder,
      textAlign: 'left',
      color: theme.colors.textAlt,
    },
    headerTextCentered: {
      textAlign: 'center',
    },
  }))

  const notAndroid = Platform.OS !== 'android'
  const childrenIsText = typeof children === 'string'

  return (
    <View style={[styles.headerContainer, style]}>
      {notAndroid && withGoBack && <GoBack />}
      <View style={styles.headerContentContainer}>
        {childrenIsText ? (
          <Text
            numberOfLines={1}
            style={[
              styles.headerText,
              withGoBack ? styles.headerTextCentered : undefined,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
      {notAndroid && childrenIsText && withGoBack && <GoBack filler />}
    </View>
  )
}

export default ScreenSimpleHeaderTemplate
