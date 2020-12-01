/**
 * @format
 * @flow
 */

import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { UIButton, UIHeader, UISeparator, UITextArea } from 'ui-elements'
import { translate } from 'utils/i18n'

const ReportForm: (args: any) => React$Node = ({
  formReport: { content: stateContent, type: stateType },
  header,
  initialContent,
  setContent,
  setType,
  type,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent)
    }
    if (type) {
      setType(type)
    }
  }, [initialContent, setContent, setType, type])

  const onSubmit = () => {
    setIsLoading(true)
    console.log(stateType, stateContent)
    setIsLoading(false)
  }

  return (
    <>
      <UIHeader subheader>{header}</UIHeader>
      <UISeparator invisible small />
      <UITextArea onChangeText={setContent} rows={6}>
        {stateContent}
      </UITextArea>
      <UISeparator invisible />
      <UIButton
        onPress={onSubmit}
        disabled={isLoading}
        secondary
        style={styles.reportButton}>
        {translate('cta.send')}
      </UIButton>
    </>
  )
}

const styles = StyleSheet.create({
  reportButton: {
    alignSelf: 'center',
  },
})

export default ReportForm
