/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from 'hooks'
import UIText from 'ui-elements/text'
import { UI_ELEMENT_BORDER_MARGIN } from 'utils/constants'

const UISetting: (args: any) => Node = ({
  children,
  description,
  label,
  onPress,
  ...otherProps
}) => {
  const { createStyles, typography } = useTheme()

  const styles = createStyles((theme) => ({
    uiSettingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.neutral,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 8,
      paddingRight: 8,
      marginTop: 12,
    },
    uiSettingText: {
      flex: 1,
      color: theme.colors.text,
      fontSize: typography.fontSize.large,
      fontWeight: typography.fontWeight.light,
    },
    uiSettingDescription: {
      marginTop: UI_ELEMENT_BORDER_MARGIN,
    },
  }))

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
          {...otherProps}>
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

export default UISetting
