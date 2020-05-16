/**
 * @format
 * @flow strict-local
 */

import React, { useState, useRef, useEffect } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { iconChevron } from 'images'
import colors from 'styles/colors'

const UIListItemContent: () => React$Node = ({
  children,
  style,
  hasExtra = false,
  badgeNum = null,
  badgeActive = false,
  ...otherProps
}) => (
  <View {...otherProps} style={uiListItemContainerStyle}>
    {typeof children === 'string' ? (
      <Text style={StyleSheet.compose(styles.uiListItemText, style)}>
        {children}
      </Text>
    ) : (
      children
    )}
    <View style={styles.uiListItemExtra}>
      {typeof badgeNum === 'number' && (
        <View style={styles.uiListItemExtraBadge}>
          <Text
            style={
              badgeActive
                ? StyleSheet.compose(
                    styles.uiListItemExtraBadgeText,
                    styles.uiListItemExtraBadgeTextActive,
                  )
                : styles.uiListItemExtraBadgeText
            }>{`${badgeNum}`}</Text>
        </View>
      )}
      {hasExtra && (
        <Image
          source={iconChevron}
          style={styles.iconChevron}
          resizeMode="contain"
        />
      )}
    </View>
  </View>
)

const UIListItem: () => React$Node = ({
  children,
  editable = false,
  onBlur,
  onPress,
  onLongPress,
  style,
  ...otherProps
}) => {
  const [editMode, setEditMode] = useState(false)

  const inputRef = useRef(null)

  const isClickable =
    typeof onPress === 'function' || typeof onLongPress === 'function'

  useEffect(() => {
    if (editMode && inputRef) {
      inputRef.current.focus()
    }
  }, [editMode])

  const onEditableBlur = (...args) => {
    setEditMode(false)
    if (typeof onBlur === 'function') {
      onBlur(...args)
    }
  }

  const onEditablePress = (...args) => {
    if (editable) {
      setEditMode(true)
    } else if (isClickable) {
      onPress(...args)
    }
  }

  if (editMode) {
    return (
      <TextInput
        {...otherProps}
        ref={inputRef}
        onBlur={onEditableBlur}
        style={StyleSheet.compose(uiListItemTextInputStyle, style)}
      />
    )
  }

  if (isClickable) {
    return (
      <TouchableOpacity onPress={onEditablePress} onLongPress={onLongPress}>
        <UIListItemContent {...otherProps} style={style}>
          {children}
        </UIListItemContent>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={onEditablePress}>
      <UIListItemContent {...otherProps} style={style}>
        {children}
      </UIListItemContent>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  uiListItemCommon: {
    minHeight: 52,
    width: '100%',
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: colors.white,
  },
  uiListItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uiListItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.blue,
    paddingTop: 12,
    paddingBottom: 12,
  },
  uiListItemTextInput: {
    textAlignVertical: 'top',
  },
  uiListItemExtra: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uiListItemExtraBadge: {
    display: 'flex',
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

const uiListItemContainerStyle = StyleSheet.compose(
  styles.uiListItemCommon,
  styles.uiListItemContainer,
)

const uiListItemTextInputStyle = StyleSheet.compose(
  styles.uiListItemCommon,
  styles.uiListItemText,
  styles.uiListItemTextInput,
)

export default UIListItem
