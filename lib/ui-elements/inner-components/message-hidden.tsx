import { View } from 'react-native'
import type { ViewProps } from 'react-native'
import { useTheme } from '@hooks'
import UIListItem from '@ui-elements/list-item'

export type UIMessageHiddenProps = {
  read?: boolean
} & ViewProps

const UIMessageHidden = ({
  children,
  read,
  ...otherProps
}: UIMessageHiddenProps) => {
  const { createStyles } = useTheme()

  const styles = createStyles((theme) => ({
    resetUIListItemContainer: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
    },
    resetUIListItemContainerUnread: {
      backgroundColor: theme.colors.secondary,
    },
    uiMessageHiddenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  }))

  return (
    <UIListItem
      style={[
        styles.resetUIListItemContainer,
        read ? undefined : styles.resetUIListItemContainerUnread,
      ]}
    >
      <View style={styles.uiMessageHiddenContainer} {...otherProps}>
        {children}
      </View>
    </UIListItem>
  )
}

UIMessageHidden.defaultProps = {
  read: false,
}

export default UIMessageHidden
