/**
 * @format
 * @flow
 */

import { StyleSheet, Text, View } from 'react-native'
import colors from 'styles/colors'

const UIListItemContentMain: (args: any) => React$Node = ({
  caption,
  children,
  isPressed = false,
  noFeedback = false,
  selected = false,
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
            styles.uiListItemText,
            styles.uiListItemPadding,
            selected ? styles.uiListItemTextSelected : undefined,
            isPressed && !noFeedback ? styles.uiListItemTextPressed : undefined,
            style,
          ]}>
          {children}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            styles.uiListItemCaption,
            selected ? styles.uiListItemTextSelected : undefined,
            isPressed && !noFeedback ? styles.uiListItemTextPressed : undefined,
            style,
          ]}>
          {caption}
        </Text>
      </View>
    )
  }

  return (
    <>
      {typeof children === 'string' ? (
        <Text
          style={[
            styles.uiListItemText,
            selected ? styles.uiListItemTextSelected : undefined,
            isPressed && !noFeedback ? styles.uiListItemTextPressed : undefined,
            style,
          ]}>
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
  uiListItemTextPressed: {
    color: colors.blue,
  },
  uiListItemCaption: {
    fontSize: 12,
    fontWeight: '200',
    paddingTop: 3,
    color: colors.black,
  },
  uiListItemPadding: {
    paddingBottom: 3,
  },
})

export default UIListItemContentMain
