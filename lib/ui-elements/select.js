/**
 * @format
 * @flow
 */

import { useState } from 'react'
import type { Node } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useTheme } from 'hooks'
import UIInput from 'ui-elements/input'
import UISelectPlatform from 'ui-elements/inner-components/select'
import { UI_SELECT_OPTION_HEIGHT } from 'utils/constants'

const UISelect: (args: any) => Node = ({
  error,
  errorMessage,
  items = [],
  placeholder,
  selectedValue,
  ...otherProps
}) => {
  const [selectorOpen, setSelectorOpen] = useState(false)

  const {
    theme: { colors },
  } = useTheme()

  const toggleModal = () => setSelectorOpen(!selectorOpen)

  const translateSelectedValue = () =>
    items.find(({ value }) => value === selectedValue)?.label

  return (
    <View style={styles.selectContainer}>
      {/* $FlowFixMe: onTouchStart in an undocumented feature */}
      <Pressable onTouchStart={toggleModal}>
        <UIInput
          placeholder={placeholder}
          editable={false}
          style={StyleSheet.compose(
            styles.selectInput,
            selectorOpen ? { borderBottomColor: colors.text } : {},
          )}
          value={translateSelectedValue()}
          error={error}
          errorMessage={errorMessage}
          active={selectorOpen}
        />
      </Pressable>
      <UISelectPlatform
        items={items}
        selectedValue={selectedValue}
        selectorOpen={selectorOpen}
        toggleModal={toggleModal}
        {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  selectContainer: {
    width: '100%',
    borderWidth: 0,
  },
  selectInput: {
    height: UI_SELECT_OPTION_HEIGHT,
    width: '100%',
  },
})

export default UISelect
