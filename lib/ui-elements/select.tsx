import { useCallback, useMemo, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useTheme } from '@hooks'
import UIInput from '@ui-elements/input'
import UISelectPlatform from '@ui-elements/inner-components/select'
import { UI_SELECT_OPTION_HEIGHT } from '@utils/constants'

export type UISelectProps = {
  error: boolean
  errorMessage: string
  items: Array<{ key: string; label: string; value: string | number }>
  onChange: (value: string | number) => void
  placeholder: string
  selectedValue: string | number
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

  const styledOpenSelector = createStyles((theme) => ({
    borderBottomColor: theme.colors.text,
  }))

  const inputStyle = useMemo(
    () =>
      selectorOpen
        ? StyleSheet.compose(styles.selectInput, styledOpenSelector)
        : styles.selectInput,
    [selectorOpen, styledOpenSelector],
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
