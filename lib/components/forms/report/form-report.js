/**
 * @format
 * @flow
 */

import { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import {
  UIButton,
  UIHeader,
  UILoader,
  UISeparator,
  UIText,
  UITextArea,
} from 'ui-elements'
import { submitUserFeedback } from 'utils/network'
import { logError } from 'utils/dev'
import { translate } from 'utils/i18n'

const ReportForm: (args: any) => React$Node = ({
  formReport: { content: stateContent, type: stateType },
  header,
  initialContent,
  setContent,
  setType,
  type,
}) => {
  const [extraContent, setExtraContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (initialContent) {
      setExtraContent(initialContent)
    }
    if (type) {
      setType(type)
    }
  }, [initialContent, setContent, setType, type])

  const onSubmit = async () => {
    const fullContent = `${extraContent}${stateContent}`
    if (stateType && fullContent) {
      try {
        setIsLoading(true)
        const result = await submitUserFeedback(stateType, fullContent)
        if (result) {
          setExtraContent('')
          setContent('')
          Alert.alert(translate('forms.reportErrorMessageDone'))
        } else {
          Alert.alert(translate('forms.reportErrorMessageFail'))
        }
      } catch (err) {
        logError(err)
      } finally {
        setIsLoading(false)
      }
    } else {
      Alert.alert(translate('feedback.errorMessages.blankMessage'))
    }
  }

  return (
    <>
      <UILoader active={isLoading} transparent />
      <UIHeader subheader>{header}</UIHeader>
      <UISeparator invisible small />
      {!!extraContent && (
        <UIText>{translate('forms.reportHasExtraInfo')}</UIText>
      )}
      <UITextArea onChangeText={setContent} rows={6}>
        {stateContent}
      </UITextArea>
      <UISeparator invisible small />
      <UIButton
        onPress={onSubmit}
        disabled={isLoading}
        secondary
        style={styles.reportButton}>
        {translate('cta.send')}
      </UIButton>
      {!extraContent && <UIText>{translate('forms.reportDisclaimer')}</UIText>}
    </>
  )
}

const styles = StyleSheet.create({
  reportButton: {
    alignSelf: 'center',
  },
})

export default ReportForm
