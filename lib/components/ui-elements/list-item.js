/**
 * @format
 * @flow
 */

import React from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import UIListItemContent from './list-item-content'

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

  const Touchable = noFeedback ? TouchableWithoutFeedback : TouchableOpacity

  if (isClickable) {
    return (
      <Touchable onPress={onPress} onLongPress={onLongPress}>
        <UIListItemContent {...otherProps} style={style}>
          {children}
        </UIListItemContent>
      </Touchable>
    )
  }

  return (
    <UIListItemContent {...otherProps} style={style}>
      {children}
    </UIListItemContent>
  )
}

export default UIListItem
