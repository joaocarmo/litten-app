/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import UIText from 'ui-elements/text'
import { UI_ELEMENT_BORDER_MARGIN } from 'utils/constants'
import colors from 'styles/colors'
import { fontSize, fontWeight } from 'styles/typography'

const UISetting: (args: any) => Node = ({
  children,
  description,
  label,
  onPress,
  ...otherProps
}) => {
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

const styles = StyleSheet.create({
  uiSettingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 12,
  },
  uiSettingText: {
    flex: 1,
    color: colors.black,
    fontSize: fontSize.large,
    fontWeight: fontWeight.light,
  },
  uiSettingDescription: {
    marginTop: UI_ELEMENT_BORDER_MARGIN,
  },
})

export default UISetting
