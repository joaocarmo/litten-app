import { Pressable, Text, View } from 'react-native'
import type { PressableProps, ViewProps } from 'react-native'
import { useTheme } from '@hooks'
import UIText from '@ui-elements/text'
import settingComponentStyles from '@ui-elements/setting/index.styles'

type UISettingProps = {
  description?: string
  label?: string
} & PressableProps &
  ViewProps

const UISetting = ({
  children,
  description,
  label,
  onPress,
  ...otherProps
}: UISettingProps) => {
  const { createStyles } = useTheme()

  const styles = createStyles(settingComponentStyles)

  const content = (
    <>
      <Text style={styles.uiSettingText} numberOfLines={1}>
        {label}
      </Text>
      {children}
    </>
  )

  const descriptionContent = description ? (
    <UIText style={styles.uiSettingDescription} noPadding>
      {description}
    </UIText>
  ) : null

  if (typeof onPress === 'function') {
    return (
      <>
        <Pressable
          onPress={onPress}
          style={styles.uiSettingContainer}
          {...otherProps}
        >
          {content}
        </Pressable>
        {descriptionContent}
      </>
    )
  }

  return (
    <>
      <View style={styles.uiSettingContainer} {...otherProps}>
        {content}
      </View>
      {descriptionContent}
    </>
  )
}

UISetting.defaultProps = {
  description: '',
  label: '',
}

export default UISetting
