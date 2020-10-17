/**
 * @format
 * @flow
 */

import { StyleSheet, Text, View } from 'react-native'
import colors from 'styles/colors'

const UIListItemContentMain: (args: any) => React$Node = ({
  caption,
  children,
  selected,
  style,
}) => {
  if (
    caption &&
    children &&
    typeof caption === 'string' &&
    typeof children === 'string'
  ) {
    return (
      <View style={styles.uiListItemContentMainContainer}>
        <Text
          style={[
            StyleSheet.compose(
              selected ? uiListItemTextSelectedStyle : styles.uiListItemText,
              style,
            ),
            styles.uiListItemPadding,
          ]}>
          {children}
        </Text>
        <Text
          numberOfLines={1}
          style={StyleSheet.compose(
            selected
              ? uiListItemCaptionSelectedStyle
              : styles.uiListItemCaption,
            style,
          )}>
          {caption}
        </Text>
      </View>
    )
  }

  return (
    <>
      {typeof children === 'string' ? (
        <Text
          style={StyleSheet.compose(
            selected ? uiListItemTextSelectedStyle : styles.uiListItemText,
            style,
          )}>
          {children}
        </Text>
      ) : (
        children
      )}
    </>
  )
}

const styles = StyleSheet.create({
  uiListItemContentMainContainer: {
    flex: 1,
  },
  uiListItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  uiListItemTextSelected: {
    color: colors.white,
  },
  uiListItemCaption: {
    fontSize: 12,
    fontWeight: '200',
    paddingTop: 3,
  },
  uiListItemPadding: {
    paddingBottom: 3,
  },
})

const uiListItemTextSelectedStyle = StyleSheet.compose(
  styles.uiListItemText,
  styles.uiListItemTextSelected,
)

const uiListItemCaptionSelectedStyle = StyleSheet.compose(
  uiListItemTextSelectedStyle,
  styles.uiListItemCaption,
)

export default UIListItemContentMain
