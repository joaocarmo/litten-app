/**
 * @format
 * @flow
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import UIListItem from '../list-item'

const UIMessageHidden: (args: any) => React$Node = ({
  children,
  ...otherProps
}) => (
  <UIListItem style={styles.resetUIListItemContainer}>
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
  uiMessageHiddenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})

export default UIMessageHidden
