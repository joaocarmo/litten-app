import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { PressableProps, ViewProps } from 'react-native'
import { useTheme } from '@hooks'
import { Camera as CameraIcon } from '@images/components/icons'
import {
  UI_IMAGE_PLACEHOLDER_ITEM_MARGIN,
  UI_IMAGE_PLACEHOLDER_ITEM_SIZE,
  UI_PRESSED_OPACITY,
} from '@utils/constants'
import { translate } from '@utils/i18n'

export type UIImagePlaceholderItemProps = {
  actionable?: boolean
  onPress?: PressableProps['onPress']
  onLongPress?: PressableProps['onLongPress']
} & ViewProps

const UIImagePlaceholderItem = ({
  actionable,
  onLongPress,
  onPress,
  style,
  ...otherProps
}: UIImagePlaceholderItemProps) => {
  const {
    createStyles,
    theme: { colors },
    typography,
  } = useTheme()
  const styles = createStyles((theme) => ({
    uiImagePlaceholderCommon: {
      height: UI_IMAGE_PLACEHOLDER_ITEM_SIZE,
      aspectRatio: 1,
      marginTop: UI_IMAGE_PLACEHOLDER_ITEM_MARGIN,
      marginBottom: UI_IMAGE_PLACEHOLDER_ITEM_MARGIN,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.neutralLighter,
    },
    uiImagePlaceholder: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    uiImagePlaceholderActionable: {
      backgroundColor: theme.colors.secondary,
    },
    uiImagePlaceholderPressed: {
      opacity: UI_PRESSED_OPACITY,
    },
    placeholderIcon: {
      height: 32,
      width: 36,
      margin: 8,
      tintColor: theme.colors.textAlt,
    },
    placeholderText: {
      fontSize: typography.fontSize.xxsmall,
      fontWeight: typography.fontWeight.bolder,
      color: theme.colors.textAlt,
    },
  }))
  const uiImagePlaceholderStyle = StyleSheet.compose(
    styles.uiImagePlaceholderCommon,
    styles.uiImagePlaceholder,
  )
  const uiImagePlaceholderActionableStyle = StyleSheet.compose(
    uiImagePlaceholderStyle,
    styles.uiImagePlaceholderActionable,
  )

  if (!actionable) {
    return (
      <View
        {...otherProps}
        style={StyleSheet.compose(uiImagePlaceholderStyle, style)}
      />
    )
  }

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) =>
        pressed ? styles.uiImagePlaceholderPressed : undefined
      }
    >
      <View
        style={StyleSheet.compose(uiImagePlaceholderActionableStyle, style)}
        {...otherProps}
      >
        <CameraIcon
          height={32}
          width={36}
          fill={colors.textAlt}
          style={styles.placeholderIcon}
        />
        <Text style={styles.placeholderText}>
          {translate('ui.elements.imagePlaceholder')}
        </Text>
      </View>
    </Pressable>
  )
}

UIImagePlaceholderItem.defaultProps = {
  actionable: false,
}

export default UIImagePlaceholderItem
