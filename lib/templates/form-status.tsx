import { Text, View } from 'react-native'
import type { TextProps } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { useTheme } from '@hooks'
import {
  Error as ErrorIcon,
  Success as SuccessIcon,
} from '@images/components/icons'
import { UI_OPERATION_STATUS_ICON_SIZE } from '@utils/constants'

export type FormStatusTemplateProps = {
  success?: boolean
  error?: boolean
  children: TextProps['children']
}

const FormStatusTemplate = ({
  success,
  error,
  children,
}: FormStatusTemplateProps) => {
  const {
    createStyles,
    theme: { colors },
    typography,
  } = useTheme()

  const styles = createStyles((theme) => ({
    container: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      padding: 10,
    },
    text: {
      width: vw(70),
      fontSize: typography.fontSize.xxlarge,
      fontWeight: typography.fontWeight.bolder,
      color: theme.colors.neutralDark,
      padding: 10,
      marginTop: 10,
      textAlign: 'center',
    },
  }))

  return (
    <View style={styles.container}>
      {success && (
        <SuccessIcon
          height={UI_OPERATION_STATUS_ICON_SIZE}
          width={UI_OPERATION_STATUS_ICON_SIZE}
          fill={colors.primary}
          style={styles.image}
        />
      )}
      {error && (
        <ErrorIcon
          height={UI_OPERATION_STATUS_ICON_SIZE}
          width={UI_OPERATION_STATUS_ICON_SIZE}
          fill={colors.danger}
          style={styles.image}
        />
      )}
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

FormStatusTemplate.defaultProps = {
  success: false,
  error: false,
}

export default FormStatusTemplate
