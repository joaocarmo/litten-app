import { Platform, Text, View } from 'react-native'
import type { ViewProps } from 'react-native'
import { useTheme } from '@hooks'
import GoBack from '@components/go-back'
import screenSimpleHeaderTemplateStyles from '@templates/screen-simple-header.styles'

export type ScreenSimpleHeaderTemplateProps = {
  children?: ViewProps['children']
  style?: ViewProps['style']
  withGoBack?: boolean
}

const ScreenSimpleHeaderTemplate = ({
  children,
  style,
  withGoBack,
}: ScreenSimpleHeaderTemplateProps) => {
  const { createStyles } = useTheme()

  const styles = createStyles(screenSimpleHeaderTemplateStyles)

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

ScreenSimpleHeaderTemplate.defaultProps = {
  children: null,
  style: undefined,
  withGoBack: false,
}

export default ScreenSimpleHeaderTemplate
