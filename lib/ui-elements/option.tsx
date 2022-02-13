import { useState } from 'react'
import UISetting from '@ui-elements/setting'
import UISelectPlatform from '@ui-elements/inner-components/select'
import type { IOSSelectProps } from '@ui-elements/inner-components/select'
import UIText from '@ui-elements/text'

export type UIOptionProps = {
  description?: string
  label: string
} & IOSSelectProps

const UIOption = ({
  description,
  items,
  label,
  selectedValue,
  ...otherProps
}: UIOptionProps) => {
  const [selectorOpen, setSelectorOpen] = useState(false)

  const toggleModal = () => setSelectorOpen(!selectorOpen)

  const translateSelectedValue = () =>
    items.find(({ value }) => value === selectedValue)?.label

  return (
    <>
      <UISetting label={label} description={description} onPress={toggleModal}>
        <UIText noPadding>{translateSelectedValue()}</UIText>
      </UISetting>
      <UISelectPlatform
        items={items}
        selectedValue={selectedValue}
        selectorOpen={selectorOpen}
        toggleModal={toggleModal}
        {...otherProps}
      />
    </>
  )
}

UIOption.defaultProps = {
  description: '',
}

export default UIOption
