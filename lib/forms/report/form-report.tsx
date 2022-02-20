import Toast from 'react-native-simple-toast'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import {
  UIButton,
  UIHeader,
  UILoader,
  UISeparator,
  UIText,
  UITextArea,
} from '@ui-elements'
import AddPhoto from '@components/add-photo'
import ImageComponent from '@forms/report/image-component'
import PlaceholderComponent from '@forms/report/placeholder-component'
import { getImagePath, iterateTimes } from '@utils/functions'
import { submitUserFeedback, handleNetworkError } from '@utils/network'
import {
  MAX_NUM_OF_REPORT_IMAGES,
  NUM_OF_REPORT_IMAGES,
} from '@utils/constants'
import { translate } from '@utils/i18n'

const NUM_IMAGES = Math.min(NUM_OF_REPORT_IMAGES, MAX_NUM_OF_REPORT_IMAGES)

const ReportForm = ({
  formReport: { attachments, content: stateContent, type: stateType },
  header,
  initialContent,
  resetForm,
  setAttachments,
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
  }, [initialContent])

  useEffect(() => {
    if (type) {
      setType(type)
    }
  }, [setType, type])

  useEffect(() => () => resetForm(), [resetForm])

  const onChangeImage = useCallback(
    (image, index) => {
      const imagePath = getImagePath(image)
      const newAttachments = [...attachments]
      newAttachments[index] = imagePath
      // Clean possible empty attachments
      setAttachments(newAttachments.filter((v) => !!v))
    },
    [attachments, setAttachments],
  )

  const onSubmit = useCallback(async () => {
    const fullContent = `${extraContent}${stateContent}`

    if (stateType && fullContent) {
      try {
        setIsLoading(true)
        const result = await submitUserFeedback(
          stateType,
          fullContent,
          attachments,
        )

        if (result) {
          setExtraContent('')
          setContent('')
          setAttachments([])
          Toast.show(translate('forms.reportErrorMessageDone'))
        } else {
          Alert.alert(translate('forms.reportErrorMessageFail'))
        }
      } catch (err) {
        handleNetworkError(err)
      } finally {
        setIsLoading(false)
      }
    } else {
      Alert.alert(translate('feedback.errorMessages.blankMessage'))
    }
  }, [
    attachments,
    extraContent,
    setAttachments,
    setContent,
    stateContent,
    stateType,
  ])

  const attachmentSelector = useMemo(() => {
    if (NUM_OF_REPORT_IMAGES > 0) {
      return (
        <View style={styles.reportImagesContainer}>
          {iterateTimes(NUM_IMAGES).map((_, index) => (
            <AddPhoto
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              ImageComponent={ImageComponent}
              imageSource={attachments[index]}
              onChange={(image) => onChangeImage(image, index)}
              PlaceholderComponent={PlaceholderComponent}
            />
          ))}
        </View>
      )
    }

    return null
  }, [attachments, onChangeImage])

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
      {attachmentSelector}
      <UISeparator invisible small />
      <UIButton
        onPress={onSubmit}
        disabled={isLoading}
        secondary
        style={styles.reportButton}
      >
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
  reportImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})

export default ReportForm
