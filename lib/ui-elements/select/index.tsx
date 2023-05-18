import { useCallback, useMemo, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useTheme } from '@hooks'
import UIInput from '@ui-elements/input'
import UISelectPlatform from '@ui-elements/inner-components/select'
import type { IOSSelectProps } from '@ui-elements/inner-components/select'
import uiSelectStyles from '@ui-elements/select/index.styles'

export interface UISelectProps extends IOSSelectProps {
  error?: boolean
  errorMessage?: string
  placeholder: string
}

const UISelect = ({
  error,
  errorMessage,
  items,
  placeholder,
  selectedValue,
  ...otherProps
}: UISelectProps) => {
  const [selectorOpen, setSelectorOpen] = useState(false)
  const { createStyles } = useTheme()

  const toggleModal = useCallback(
    () => setSelectorOpen(!selectorOpen),
    [selectorOpen],
  )

  const translateSelectedValue = useCallback(
    () => items.find(({ value }) => value === selectedValue)?.label,
    [items, selectedValue],
  )

  const styles = createStyles(uiSelectStyles)

  const inputStyle = useMemo(
    () =>
      selectorOpen
        ? StyleSheet.compose(styles.selectInput, styles.selectOpen)
        : styles.selectInput,
    [selectorOpen, styles.selectInput, styles.selectOpen],
  )

  return (
    <View style={styles.selectContainer}>
      <Pressable
        // `onTouchStart` in an undocumented feature of React Native
        onTouchStart={toggleModal}
      >
        <UIInput
          placeholder={placeholder}
          editable={false}
          style={inputStyle}
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

UISelect.defaultProps = {
  error: false,
  errorMessage: '',
}

export default UISelect
