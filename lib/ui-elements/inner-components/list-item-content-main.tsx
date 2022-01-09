import { memo } from 'react'
import { Text, View } from 'react-native'
import type { TextProps } from 'react-native'
import { useTheme } from '@hooks'

export type UIListItemContentMainProps = {
  caption?: string
  children?: TextProps['children']
  isPressed?: boolean
  noFeedback?: boolean
  selected?: boolean
  style?: TextProps['style']
}

const areEqual = (prevProps, nextProps) =>
  prevProps.caption === nextProps.caption &&
  prevProps.children === nextProps.children &&
  prevProps.isPressed === nextProps.isPressed &&
  prevProps.noFeedback === nextProps.noFeedback &&
  prevProps.selected === nextProps.selected

const UIListItemContentMain = ({
  caption,
  children,
  isPressed,
  noFeedback,
  selected,
  style,
}: UIListItemContentMainProps) => {
  const { createStyles } = useTheme()

  const styles = createStyles((theme, typography) => ({
    uiListItemContentMainContainer: {
      flex: 1,
    },
    uiListItemText: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.regular,
      color: theme.colors.text,
    },
    uiListItemTextSelected: {
      color: theme.colors.textAlt,
    },
    uiListItemTextPressed: {
      color: theme.colors.secondary,
    },
    uiListItemCaption: {
      fontSize: typography.fontSize.small,
      fontWeight: typography.fontWeight.lighter,
      paddingTop: 3,
      color: theme.colors.text,
    },
    uiListItemPadding: {
      paddingBottom: 3,
    },
  }))

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
    return children
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
}

export default memo(UIListItemContentMain, areEqual)
