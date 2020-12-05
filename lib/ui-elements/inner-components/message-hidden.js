/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import UIListItem from 'ui-elements/list-item'
import colors from 'styles/colors'

const UIMessageHidden: (args: any) => React$Node = ({
  children,
  read = false,
  ...otherProps
}) => (
  <UIListItem
    style={[
      styles.resetUIListItemContainer,
      read ? undefined : styles.resetUIListItemContainerUnread,
    ]}>
    <View style={styles.uiMessageHiddenContainer} {...otherProps}>
      {children}
    </View>
  </UIListItem>
)

const styles = StyleSheet.create({
  resetUIListItemContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  resetUIListItemContainerUnread: {
    backgroundColor: colors.blue,
  },
  uiMessageHiddenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})

export default UIMessageHidden
