/**
 * @format
 * @flow
 */

import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from 'styles/colors'
import { fontSize, fontWeight } from 'styles/typography'

type UIListItemContentMainProps = {
  caption?: string,
  children?: React$Node,
  isPressed?: boolean,
  noFeedback?: boolean,
  selected?: boolean,
  style?: any,
}

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.caption === nextProps.caption &&
    prevProps.children === nextProps.children &&
    prevProps.isPressed === nextProps.isPressed &&
    prevProps.noFeedback === nextProps.noFeedback &&
    prevProps.selected === nextProps.selected
  )
}

const UIListItemContentMain: (
  props: UIListItemContentMainProps,
) => React$Node = ({
  caption = null,
  children = null,
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
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    color: colors.black,
  },
  uiListItemTextSelected: {
    color: colors.white,
  },
  uiListItemTextPressed: {
    color: colors.blue,
  },
  uiListItemCaption: {
    fontSize: fontSize.small,
    fontWeight: fontWeight.lighter,
    paddingTop: 3,
    color: colors.black,
  },
  uiListItemPadding: {
    paddingBottom: 3,
  },
})

export default (memo<UIListItemContentMainProps>(
  UIListItemContentMain,
  areEqual,
): React$AbstractComponent<UIListItemContentMainProps, mixed>)
