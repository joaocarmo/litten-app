import type { FC } from 'react'
import { Text, View } from 'react-native'
import type { TextProps } from 'react-native'
import { useTheme } from '@hooks'
import uiListItemContentMainStyles from '@ui-elements/inner-components/list-item-content-main.styles'

export type UIListItemContentMainProps = {
  caption?: string
  children?: TextProps['children']
  isPressed?: boolean
  noFeedback?: boolean
  selected?: boolean
  style?: TextProps['style']
}

const UIListItemContentMain: FC<UIListItemContentMainProps> = ({
  caption,
  children,
  isPressed,
  noFeedback,
  selected,
  style,
}) => {
  const { createStyles } = useTheme()

  const styles = createStyles(uiListItemContentMainStyles)

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
          ]}
        >
          {children}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            styles.uiListItemCaption,
            selected ? styles.uiListItemTextSelected : undefined,
            isPressed && !noFeedback ? styles.uiListItemTextPressed : undefined,
            style,
          ]}
        >
          {caption}
        </Text>
      </View>
    )
  }

  if (typeof children !== 'string') {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>
  }

  return (
    <Text
      style={[
        styles.uiListItemText,
        selected ? styles.uiListItemTextSelected : undefined,
        isPressed && !noFeedback ? styles.uiListItemTextPressed : undefined,
        style,
      ]}
    >
      {children}
    </Text>
  )
}

UIListItemContentMain.defaultProps = {
  caption: null,
  children: null,
  isPressed: false,
  noFeedback: false,
  selected: false,
  style: undefined,
}

export default UIListItemContentMain
