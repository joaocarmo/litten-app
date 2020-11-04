/**
 * @format
 * @flow
 */

import { Pressable, StyleSheet } from 'react-native'
import UIListItemContent from './inner-components/list-item-content'

const UIListItem: (args: any) => React$Node = ({
  children,
  onBlur,
  onLongPress,
  onPress,
  style,
  noFeedback = false,
  ...otherProps
}) => {
  const isClickable =
    typeof onPress !== 'undefined' || typeof onLongPress !== 'undefined'

  if (isClickable) {
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={({ pressed }) =>
          pressed && !noFeedback ? styles.uiListItemPressed : undefined
        }>
        <UIListItemContent {...otherProps} style={style}>
          {children}
        </UIListItemContent>
      </Pressable>
    )
  }

  return (
    <UIListItemContent {...otherProps} style={style}>
      {children}
    </UIListItemContent>
  )
}

const styles = StyleSheet.create({
  uiListItemPressed: {
    opacity: 0.4,
  },
})

export default UIListItem
