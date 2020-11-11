/**
 * @format
 * @flow
 */

import { StyleSheet, Text, View } from 'react-native'
import UIListItemContentMain from './list-item-content-main'
import UIImage from '../image'
import { iconChevron } from 'images'
import { UI_ICON_SIZE_MINI } from 'utils/constants'
import colors from 'styles/colors'

const UIListItemContent: (args: any) => React$Node = ({
  badgeActive = false,
  badgeNum = null,
  children,
  hasExtra = false,
  icon,
  isPressed = false,
  noFeedback = false,
  selected = false,
  style,
  ...otherProps
}) => (
  <View
    style={[
      styles.uiListItemCommon,
      styles.uiListItemContainer,
      style,
      selected ? styles.uiListItemCommonSelected : undefined,
      isPressed && !noFeedback ? styles.uiListItemCommonPressed : undefined,
    ]}>
    <View style={styles.uiListItemContentContainer}>
      {icon && (
        <UIImage
          source={icon}
          style={[
            styles.uiListItemIcon,
            selected ? styles.uiListItemIconSelected : undefined,
          ]}
        />
      )}
      <UIListItemContentMain
        isPressed={isPressed}
        noFeedback={noFeedback}
        selected={selected}
        {...otherProps}>
        {children}
      </UIListItemContentMain>
    </View>
    <View style={styles.uiListItemExtra}>
      {typeof badgeNum === 'number' && (
        <View style={styles.uiListItemExtraBadge}>
          <Text
            style={[
              styles.uiListItemExtraBadgeText,
              badgeActive ? styles.uiListItemExtraBadgeTextActive : undefined,
            ]}>{`${badgeNum}`}</Text>
        </View>
      )}
      {hasExtra && <UIImage source={iconChevron} style={styles.iconChevron} />}
    </View>
  </View>
)

const styles = StyleSheet.create({
  uiListItemCommon: {
    flex: 1,
    minHeight: 64,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  uiListItemCommonSelected: {
    backgroundColor: colors.blue,
  },
  uiListItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uiListItemContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  uiListItemIcon: {
    height: UI_ICON_SIZE_MINI,
    width: UI_ICON_SIZE_MINI,
    marginRight: 16,
  },
  uiListItemIconSelected: {
    tintColor: colors.white,
  },
  uiListItemCommonPressed: {
    backgroundColor: colors.lighterBlue,
  },
  uiListItemExtra: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uiListItemExtraBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    minWidth: 20,
    borderRadius: 8,
    padding: 4,
    marginRight: 4,
    backgroundColor: colors.lightGray,
  },
  uiListItemExtraBadgeText: {
    color: colors.black,
    fontSize: 10,
    fontWeight: '600',
  },
  uiListItemExtraBadgeTextActive: {
    color: colors.blue,
  },
  iconChevron: {
    maxHeight: 12,
    maxWidth: 12,
  },
})

export default UIListItemContent
