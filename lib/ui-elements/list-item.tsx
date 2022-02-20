import { useMemo, useState } from 'react'
import { Pressable } from 'react-native'
import type { PressableProps } from 'react-native'
import UIListItemContent from '@ui-elements/inner-components/list-item-content'
import type { UIListItemContentProps } from '@ui-elements/inner-components/list-item-content'

export type UIListItemProps = {
  onLongPress?: PressableProps['onLongPress']
  onPress?: PressableProps['onPress']
} & UIListItemContentProps

const UIListItem = ({
  children,
  onLongPress,
  onPress,
  ...otherProps
}: UIListItemProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const isClickable =
    typeof onPress !== 'undefined' || typeof onLongPress !== 'undefined'

  const content = useMemo(
    () => (
      <UIListItemContent isPressed={isPressed} {...otherProps}>
        {children}
      </UIListItemContent>
    ),
    [children, isPressed, otherProps],
  )

  if (isClickable) {
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        {content}
      </Pressable>
    )
  }

  return content
}

UIListItem.defaultProps = {
  onLongPress: undefined,
  onPress: undefined,
}

export default UIListItem
